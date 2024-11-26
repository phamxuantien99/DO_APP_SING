import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import SvgIcon from '../assets/images/Icon blue.svg';
import SvgIcon2 from '../assets/images/Icon Weight.svg';
import Colors from '../helper/Colors';
import Icon, {Icons} from '../helper/Icons';
import AccountNavigation from './AccountNavigation';
import DeliveriedNavigation from './DeliveriedNavigation';
import HomNavigation from './HomNavigation';
import OnGoingNavigation from './OnGoingNavigation';

// Define the tab navigation item type
interface TabItem {
  route: string;
  label: string;
  //   type: keyof typeof Icons | 'svg'; // Adjusted for icon type
  type: any;
  icon?: string;
  component: React.ComponentType<any>;
  Icon?: string; // For handling SVG icons
  child: string;
}

const TabArr: TabItem[] = [
  {
    route: 'Home',
    label: 'Home',
    type: Icons.Feather,
    icon: 'home',
    component: HomNavigation,
    child: 'home',
  },
  {
    route: 'MyWorkdone',
    label: 'On Going',
    type: Icons.Feather,
    icon: 'pen-tool',
    // type: 'svg',
    // Icon: 'icon1',
    component: OnGoingNavigation,
    child: 'ongoing',
  },
  {
    route: 'WorkSpace',
    label: 'Delivered',
    type: Icons.Feather,
    icon: 'plus-square',
    component: DeliveriedNavigation,
    child: 'delivered',
  },

  {
    route: 'Account',
    label: 'Account',
    type: Icons.FontAwesome,
    icon: 'user-circle-o',
    component: AccountNavigation,
    child: 'account',
  },
];

const Tab = createBottomTabNavigator();

const animate1 = {
  0: {scale: 0.5, translateY: 7},
  0.92: {translateY: -34},
  1: {scale: 1.2, translateY: -24},
};

const animate2 = {
  0: {scale: 1.2, translateY: -24},
  1: {scale: 1, translateY: 7},
};

const circle1 = {
  0: {scale: 0},
  0.3: {scale: 0.9},
  0.5: {scale: 0.2},
  0.8: {scale: 0.7},
  1: {scale: 1},
};
const circle2 = {0: {scale: 1}, 1: {scale: 0}};

interface TabButtonProps {
  item: TabItem;
  onPress: () => void;
  accessibilityState: {selected: boolean};
}

const TabButton: React.FC<TabButtonProps> = ({
  item,
  onPress,
  accessibilityState,
}) => {
  const focused = accessibilityState.selected;
  const viewRef = useRef<Animatable.View & View>(null);
  const circleRef = useRef<Animatable.View & View>(null);
  const textRef = useRef<Animatable.Text & View>(null);
  const isDarkMode = useColorScheme() === 'dark';

  const {colors} = useTheme();
  const color = isDarkMode ? Colors.white : Colors.black;
  const bgColor = colors.background;

  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.2 : 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  useEffect(() => {
    if (focused && viewRef.current && circleRef.current && textRef.current) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({scale: 1});
    } else if (viewRef.current && circleRef.current && textRef.current) {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({scale: 0});
    }
  }, [focused]);

  const navigation = useNavigation();
  const hasNavigated = useRef(false); // Trạng thái lưu trữ xem đã chuyển tab hay chưa

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.containerTouchableOpacity}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View
          style={[
            styles.btn,
            {borderColor: bgColor, backgroundColor: bgColor},
          ]}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Animated.View style={{transform: [{scale}]}}>
            {item.type === 'svg' ? (
              focused ? (
                <SvgIcon2 width={24} height={24} />
              ) : (
                <SvgIcon width={24} height={24} />
              )
            ) : (
              <Icon
                type={item.type}
                name={item.icon!}
                color={focused ? Colors.white : Colors.primary}
              />
            )}
          </Animated.View>
        </View>
        <Animatable.Text ref={textRef} style={[styles.text, {color}]}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const AnimTab1: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}>
        {TabArr.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default AnimTab1;

const styles = StyleSheet.create({
  containerTouchableOpacity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  tabBar: {
    height: 70,
    position: 'absolute',
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.primary,
    fontWeight: '500',
  },
});
