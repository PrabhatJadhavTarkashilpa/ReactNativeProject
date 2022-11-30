import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

function SortAndFilter(props) {
  const navigation = useNavigation();
  return (
    <View style={styles?.sortFilterContainer}>
      <Pressable
        style={styles?.sortContainer}
        onPress={() => props?.setShowSortModal(true)}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Image
            style={styles?.sortImage}
            source={require('../styles/icons/sorticon.png')}
          />
          <Text style={styles?.sort}>Sort By</Text>
          {props?.sortValue != '' && (
            <Image
              style={styles?.tickImage}
              source={require('../styles/images/orange_tick.png')}
            />
          )}
        </View>
      </Pressable>
      <Pressable
        style={styles?.filterContainer}
        onPress={() => navigation.navigate('Filter Page')}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Image
            style={styles?.filterImage}
            source={require('../styles/icons/filter.png')}
          />
          <Text style={styles?.filter}>Filter</Text>
          <Image
            style={styles?.tickImage}
            source={require('../styles/images/orange_tick.png')}
          />
        </View>
      </Pressable>
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
  tickImage: {
    width: 16,
    height: 16,
    marginLeft: 6,
    marginTop: 3,
  },
});
export default SortAndFilter;
