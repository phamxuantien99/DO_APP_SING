import axios from 'axios';
import {getToken, storeToken} from './saveAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL_V1 = 'https://ec2api.deltatech-backend.com/api/v1';
export const BASE_URL_V2 = 'https://ec2api.deltatech-backend.com/api/v2';

// Instance for V1 API (Login, Logout)
const apiAxiosV1 = axios.create({
  baseURL: BASE_URL_V1,
});

apiAxiosV1.defaults.headers.common['Accept'] = 'application/json';

apiAxiosV1.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiAxiosV1.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await getToken('refreshToken');
      return axios
        .put(`${BASE_URL_V1}/auth/refresh-token`, {
          refresh_token: refreshToken,
        })
        .then(async res => {
          if (res.status === 200) {
            const newAccessToken = res.data[0];
            const newExpiresIn = res.data[1];
            await storeToken(newAccessToken, 'accessToken');
            await storeToken(newExpiresIn, 'expiration');
            apiAxiosV1.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  },
);

// Instance for V2 API (Products, etc.)
const apiAxiosV2 = axios.create({
  baseURL: BASE_URL_V2,
});

apiAxiosV2.defaults.headers.common['Accept'] = 'application/json';

// Always fetch the latest access token for each request from AsyncStorage
apiAxiosV2.interceptors.request.use(
  async config => {
    const token = await getToken('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

apiAxiosV2.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Fetch the updated access token from AsyncStorage, which would have been refreshed by apiAxiosV1
      const newAccessToken = await getToken('accessToken');

      if (newAccessToken) {
        // Update the Authorization header with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return apiAxiosV2(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

export {apiAxiosV1, apiAxiosV2};
