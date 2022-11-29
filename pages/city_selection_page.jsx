import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'react-native-axios';
import {useStoreActions, useStoreState} from 'easy-peasy';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CitySelectionPage({navigation}) {
  const setCity = useStoreActions(actions => actions.setCity);
  const selectedCity = useStoreState(state => state.city);
  var imgBaseUrl = `https://staging.admin.haavoo.com/app-images/`;

  const [popularCities, setPopularCities] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [initialCities, setInitialCities] = useState([]);
  const [initialPopularCities, setInitialPopularCities] = useState([]);
  const [cityList, setCityList] = useState([]);
  // https://staging.admin.haavoo.com/api/city

  const filterByInput = input => {
    if (input != '') {
      let filteredCityList = [];
      let filteredFeaturedCityList = [];

      initialCities?.map(city => {
        if (city?.toLowerCase()?.includes(input?.toLowerCase())) {
          filteredCityList.push(city);
        }
      });

      setCityList(filteredCityList);

      initialPopularCities?.map(city => {
        if (city?.name?.toLowerCase()?.includes(input?.toLowerCase())) {
          filteredFeaturedCityList.push(city);
        }
      });

      setPopularCities(filteredFeaturedCityList);
    } else {
      fetchCities();
    }
  };

  const getCityNames = cityArray => {
    console.log('cities', cityArray);
    let cityArr = [];
    let popularCities = [];
    cityArray?.map(city => {
      if (city?.is_popular == 0) {
        cityArr?.push(city?.name);
      } else {
        popularCities?.push(city);
      }
    });
    setPopularCities(popularCities);
    setInitialPopularCities(popularCities);
    setCityList(cityArr);
    setInitialCities(cityArr);
  };

  const fetchCities = () => {
    axios
      .get(`https://staging.admin.haavoo.com/api/city`)
      .then(function (response) {
        getCityNames(response?.data?.data);
      })
      .catch(function (error) {
        // handle error
        alert("Couldn't load Cities");
      });
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const storeData = async (value, isPopular) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
      if (isPopular) {
        setCity(value);
      } else {
        setCity(value);
      }
      navigation.navigate('Home Page');
    } catch (e) {
      alert('City not selected, please try again !');
    }
  };

  // const storeData = async (value, isPopular) => {
  //   let val = value?.toString();
  //   try {
  //     await AsyncStorage.setItem('@storage_Key', val);
  //   } catch (e) {
  //     alert('City not selected, please try again !');
  //   }
  // };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require(`../styles/images/background.jpg`)}
        resizeMode="cover"
        style={styles.image}>
        <LinearGradient
          colors={['#4F0D04', '#400000', '#000']}
          style={styles.linearGradient}
        />
        <View style={styles?.citySelectionContainer}>
          <View style={styles?.heading}>
            <TouchableOpacity onPress={() => navigation.navigate('Home Page')}>
              <Image
                style={styles?.backBtn}
                source={require('../styles/icons/white-arrow-icon.png')}
              />
            </TouchableOpacity>

            <Text numberOfLines={1} style={styles?.searchText}>
              Search Your City or Location for now
            </Text>
            <View />
          </View>

          <View style={styles?.searchTextDiv}>
            <TextInput
              style={styles.citySearchInput}
              onChangeText={newText => {
                setSearchValue(newText);
                filterByInput(newText);
              }}
              autoCapitalize
              maxLength={50}
              value={searchValue}
              placeholder="Search"
              placeholderTextColor="#fff"
            />
            <Image
              style={styles?.searchIcon}
              source={require('../styles/icons/search-icon.png')}
            />
          </View>

          <ScrollView>
            <Text style={{color: '#fff', fontSize: 18, marginTop: 12}}>
              Popular Cities
            </Text>

            <View style={styles?.cityCardContainer}>
              {popularCities?.map((data, index) => {
                return (
                  <Pressable
                    style={[
                      styles?.cityCard,
                      selectedCity == data?.name ? styles?.selectedBorder : '',
                    ]}
                    onPress={() => {
                      // let copyCityCards = cityCards;
                      // copyCityCards[index].isSelected = true;
                      // citySelected(copyCityCards);

                      storeData(data?.name, true);
                    }}
                    key={index}>
                    <View style={styles?.cityCards}>
                      <Image
                        style={styles?.cityImage}
                        source={{uri: imgBaseUrl + data?.icon}}
                      />
                      <Text style={{color: '#fff', textAlign: 'center'}}>
                        {data?.name}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                marginTop: 20,
                marginBottom: 10,
                fontWeight: '650',
              }}>
              Other Cities
            </Text>

            <View style={{marginBottom: 50}}>
              {cityList?.map((data, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      storeData(data, false);
                    }}
                    key={index}
                    style={{flex: 1}}>
                    <Text
                      style={[
                        styles?.cityNames,
                        selectedCity == data ? styles?.selectedCity : '',
                      ]}>
                      {data}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 0,
    opacity: 0.8,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  image: {
    flex: 1,
  },
  citySelectionContainer: {
    flex: 1,
    padding: 15,
    paddingBottom: 0,
  },
  heading: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtn: {
    height: 20,
    width: 20,
    transform: [{rotate: '90deg'}],
  },
  searchText: {
    color: 'white',
    fontSize: 18,
    width: '70%',
  },
  searchTextDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'none',
    borderRadius: 40,
    paddingLeft: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
  },
  searchIcon: {
    marginRight: 18,
  },
  citySearchInput: {
    borderRadius: 10,
    fontSize: 18,
    color: '#fff',
  },
  cityCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    paddingTop: 15,
    // paddingBottom: 15,
    // backgroundColor: 'white',
  },
  cityCard: {
    width: '31.5%',
    height: 140,
    borderRadius: 15,
    backgroundColor: '#1D1F1C',
    marginBottom: 15,
    marginRight: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.75,
    borderColor: '#fff',
    borderStyle: 'solid',
    paddingLeft: 10,
    paddingRight: 10,
  },
  cityCards: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityImage: {
    width: 50,
    height: '65%',
    marginBottom: 6,
  },
  selectedBorder: {
    borderWidth: 1.2,
    borderColor: 'orange',
  },
  selectedCity: {
    color: 'orange',
  },
  cityNames: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 15,
  },
});

export default CitySelectionPage;
