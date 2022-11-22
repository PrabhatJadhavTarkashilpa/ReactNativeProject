import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

function SortAndFilter() {
  return (
    <View style={styles?.sortFilterContainer}>
      <View style={styles?.sortContainer}>
        <Image
          style={styles?.sortImage}
          source={require('../styles/icons/sorticon.png')}
        />
        <Text style={styles?.sort}>Sort By</Text>
      </View>
      <View style={styles?.filterContainer}>
        <Image
          style={styles?.filterImage}
          source={require('../styles/icons/filter.png')}
        />
        <Text style={styles?.filter}>Filter</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sortFilterContainer: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sortContainer: {
    backgroundColor: '#1D1F1C',
    width: '49.80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: '650',
  },
  filterContainer: {
    backgroundColor: '#1D1F1C',
    width: '49.80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sort: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '650',
  },
  filter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '650',
  },
  sortImage: {width: 20, height: 20, marginRight: 6},
  filterImage: {width: 20, height: 20, marginRight: 6},
});
export default SortAndFilter;
