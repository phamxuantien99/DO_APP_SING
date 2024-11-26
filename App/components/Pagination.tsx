import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface PaginationProps {
  setCurrentPage?: any;
  currentPage?: number;
  totalPages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  setCurrentPage,
  currentPage,
  totalPages,
}) => {
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <View style={styles.pagination}>
      <TouchableOpacity
        style={styles.paginationButton}
        onPress={() => handlePageChange((currentPage as number) - 1)}
        disabled={currentPage === 1}>
        <Text style={styles.paginationButtonText}>Previous</Text>
      </TouchableOpacity>

      <Text
        style={
          styles.paginationText
        }>{`Page ${currentPage} of ${totalPages}`}</Text>

      <TouchableOpacity
        style={styles.paginationButton}
        onPress={() => handlePageChange((currentPage as number) + 1)}
        disabled={currentPage === totalPages}>
        <Text style={styles.paginationButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  paginationButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
    minWidth: 70,
  },
  paginationButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  paginationText: {
    alignSelf: 'center',
  },
});

export default Pagination;
