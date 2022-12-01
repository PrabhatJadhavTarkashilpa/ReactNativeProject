import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  ImageBackground,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SortAndFilter from '../components/sort_filter';
import axios from 'react-native-axios';
import BusinessList from '../components/business_list';
import Loader from '../components/loader';
import {useStoreActions, useStoreState} from 'easy-peasy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SortModal from '../components/sort_modal';

function HomePage({navigation}) {
  const selectedCity = useStoreState(state => state.city);
  const businessType = useStoreState(state => state.businessType);
  const selectCategoryStore = useStoreState(state => state.category);
  const selectedArea = useStoreState(state => state.area);
  const setCity = useStoreActions(actions => actions.setCity);

  const [searchValue, setSearchValue] = useState('');
  const [businessTab, setBusinessTab] = useState(true);
  const [showSortModal, setShowSortModal] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [area, setArea] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [sortValue, setSortValue] = useState('');

  const fetchBusiness = () => {
    // console.log('fetch bsui', selectedCity, sortValue, businessType);
    setShowLoader(true);
    axios
      .get(
        `https://admin.haavoo.com/api/business?city=${selectedCity}&area=${selectedArea}&search_query=${searchValue}&page=1&type=${businessType}&category=${selectCategoryStore}&sort=${sortValue}`,
      )
      .then(function (response) {
        setApiData(response?.data?.data?.data);
        setArea(response?.data?.data?.data?.areas);
        setShowLoader(false);
      })
      .catch(function (error) {
        // handle error
        alert("Couldn't load Data");
        setShowLoader(false);
      });
  };

  useEffect(() => {
    console.log('list data', apiData);
  }, [apiData]);

  const fetchDeals = () => {
    setShowLoader(true);
    axios
      .get(
        `https://admin.haavoo.com/api/deals?city=&area=&search_query=${searchValue}&page=1&type=${businessType}&category=&sort=`,
      )
      .then(function (response) {
        setApiData(response?.data?.data?.data);
        setArea(response?.data?.data?.data?.areas);
        setShowLoader(false);
      })
      .catch(function (error) {
        // handle error
        alert("Couldn't load Data");
        setShowLoader(false);
      });
  };

  useEffect(() => {
    if (selectedCity) {
      fetchBusiness();
    }
  }, [
    selectedCity,
    sortValue,
    selectCategoryStore,
    businessType,
    selectedArea,
  ]);

  useEffect(() => {
    getCity();
  }, []);

  const getCity = () => {
    try {
      AsyncStorage.getItem('@storage_Key').then(value => {
        if (value !== null) {
          setCity(value);
        } else {
          navigation.navigate('City Selection');
        }
      });
    } catch (e) {
      alert('Select a City');
      navigation.navigate('City Selection');
    }
  };

  const imageReact = {uri: 'https://reactjs.org/logo-og.png'};

  return (
    <View style={{flex: 1}}>
      {showLoader && <Loader />}
      <ImageBackground
        source={require(`../styles/images/background.jpg`)}
        resizeMode="cover"
        style={styles.image}>
        <LinearGradient
          colors={['#4F0D04', '#400000', '#000']}
          style={styles.linearGradient}></LinearGradient>
        <View style={styles?.homeContainer}>
          <View style={styles?.heading}>
            <Text style={styles?.searchText}>Search</Text>
            <View />
          </View>

          <View style={styles?.cityName}>
            <Text
              onPress={() => navigation.navigate('City Selection')}
              style={{color: '#fdfffd', fontSize: 18}}>
              {selectedCity}
            </Text>
            <Image
              style={styles?.cityDropDown}
              source={require('../styles/icons/downArrow.png')}
            />
          </View>

          <View style={styles?.searchTextDiv}>
            <TextInput
              style={styles.citySearchInput}
              onChangeText={newText => setSearchValue(newText)}
              autoCapitalize
              maxLength={50}
              value={searchValue}
              placeholder="Search"
              placeholderTextColor="#fdfffd"
            />
            <Pressable
              onPress={() => {
                if (businessTab) {
                  fetchBusiness();
                } else {
                  fetchDeals();
                }
              }}>
              <Image
                style={styles?.searchIcon}
                source={require('../styles/icons/search-icon.png')}
              />
            </Pressable>
          </View>

          <View style={styles?.btnsContainer}>
            <Text
              style={[
                styles?.bizBtn,
                businessTab ? styles?.orangeBg : styles?.whiteBg,
              ]}
              onPress={() => {
                setBusinessTab(true);
                if (!businessTab) {
                  fetchBusiness();
                }
              }}>
              Businesses
            </Text>
            <Text
              style={[
                styles?.dealsBtn,
                businessTab ? styles?.whiteBg : styles?.orangeBg,
              ]}
              onPress={() => {
                setBusinessTab(false);
                if (businessTab) {
                  fetchDeals();
                }
              }}>
              Deals
            </Text>
          </View>

          {apiData?.length > 0 ? (
            <FlatList
              data={apiData}
              renderItem={BusinessList}
              keyExtractor={item => item.id}
            />
          ) : showLoader ? (
            ''
          ) : (
            <Text style={{color: '#fdfffd', fontSize: 16, textAlign: 'center'}}>
              Sorry, no {businessTab ? 'businesses' : 'deals'} found
            </Text>
          )}
        </View>
        <SortAndFilter
          showSortModal={showSortModal}
          setShowSortModal={setShowSortModal}
          sortValue={sortValue}
          setSortValue={setSortValue}
        />
      </ImageBackground>
      <SortModal
        showSortModal={showSortModal}
        setShowSortModal={setShowSortModal}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
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
  homeContainer: {
    flex: 1,
    padding: 15,
    paddingBottom: 0,
  },
  image: {
    flex: 1,
  },
  heading: {
    width: '100%',
    // display: 'flex',
    // flexDirection: 'row',
    // color: 'white',
    // backgroundColor: 'red',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 14,
  },
  backBtn: {
    height: 20,
    width: 20,
    transform: [{rotate: '90deg'}],
  },
  searchText: {
    color: '#fdfffd',
    fontSize: 18,
    textAlign: 'center',
  },
  cityName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#fdfffd',
    marginBottom: 20,
    alignItems: 'center',
  },
  cityDropDown: {
    height: 22,
    width: 22,
    marginLeft: 5,
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
    borderColor: '#fdfffd',
    borderStyle: 'solid',
  },
  searchIcon: {
    marginRight: 18,
  },
  citySearchInput: {
    borderRadius: 10,
    fontSize: 18,
    color: '#fdfffd',
  },
  btnsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bizBtn: {
    width: '48%',
    backgroundColor: '#fe9700',
    borderRadius: 30,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color: '#fdfffd',
    fontWeight: '650',
    fontSize: 18,
  },
  dealsBtn: {
    width: '48%',
    backgroundColor: '#fdfffd',
    borderRadius: 30,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color: '#292b29',
    fontWeight: '650',
    fontSize: 18,
  },
  orangeBg: {
    backgroundColor: '#fe9700',
    color: '#fdfffd',
  },
  whiteBg: {
    backgroundColor: '#fdfffd',
    color: '#292b29',
  },
});

export default HomePage;

// const [cardData, setCardData] = useState([
//   {
//     id: 1,
//     title: 'Thodile Lodge',
//     category: 'Lodge',
//     area: 'Kilimnorr',
//     other: ['Room Rental,', 'Door Metry'],
//     image: require('../styles/images/1.jpg'),
//   },
//   {
//     id: 2,
//     title: 'Pejdnlwe Lwnwodge',
//     category: 'Hotel',
//     area: 'Nheiworr',
//     other: ['Bwwqwd Rental,', 'Door Metry'],
//     image: require('../styles/images/2.jpeg'),
//   },
//   {
//     id: 3,
//     title: 'Qhuwc Lodge',
//     category: 'Lodge',
//     area: 'Kilimnorr',
//     other: ['Pwjwiww,', 'Door Metry'],
//     image: require('../styles/images/3.jpeg'),
//   },
//   {
//     id: 4,
//     title: 'Lniwuww Lodge',
//     category: 'Lodge',
//     area: 'Kilimnorr',
//     other: ['Room Rental,', 'Door Metry'],
//     image: require('../styles/images/4.jpg'),
//   },
// ]);
