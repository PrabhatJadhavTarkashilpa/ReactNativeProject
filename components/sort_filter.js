import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function SortAndFilter() {
  return (
    <View style={styles?.sortFilterContainer}>
      <View style={styles?.sortContainer}>
        <Text style={styles?.sort}>Sort</Text>
      </View>
      <View style={styles?.filterContainer}>
        <Text style={styles?.filter}>Filter</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sortFilterContainer: {
    backgroundColor: 'green',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
  },
  sortContainer: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '650',
  },
  filterContainer: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sort: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '650',
  },
  filter: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '650',
  },
});
export default SortAndFilter;
