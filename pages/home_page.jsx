import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Heading from '../components/heading';
import SortAndFilter from '../components/sort_filter';
import axios from 'react-native-axios';
import BusinessList from '../components/business_list';

function HomePage({navigation}) {
  const [searchValue, setSearchValue] = useState('');
  const [businessTab, setBusinessTab] = useState(true);
  const [cardData, setCardData] = useState([
    {
      id: 1,
      title: 'Thodile Lodge',
      category: 'Lodge',
      area: 'Kilimnorr',
      other: ['Room Rental,', 'Door Metry'],
      image: require('../styles/images/1.jpg'),
    },
    {
      id: 2,
      title: 'Pejdnlwe Lwnwodge',
      category: 'Hotel',
      area: 'Nheiworr',
      other: ['Bwwqwd Rental,', 'Door Metry'],
      image: require('../styles/images/2.jpeg'),
    },
    {
      id: 3,
      title: 'Qhuwc Lodge',
      category: 'Lodge',
      area: 'Kilimnorr',
      other: ['Pwjwiww,', 'Door Metry'],
      image: require('../styles/images/3.jpeg'),
    },
    {
      id: 4,
      title: 'Lniwuww Lodge',
      category: 'Lodge',
      area: 'Kilimnorr',
      other: ['Room Rental,', 'Door Metry'],
      image: require('../styles/images/4.jpg'),
    },
  ]);
  const [apiData, setApiData] = useState([]);
  const [area, setArea] = useState([]);

  // const cleanData=()=>{
  //   const regex = /(<([^>]+)>)/gi;
  //   const temp = apiData?.description.replace(regex, '');
  //   var desc = temp.replace(/&nbsp;/g, '');
  // }

  const fetchBusiness = () => {
    axios
      .get(
        'https://admin.haavoo.com/api/business?city=&area=&search_query=&page=1&type=&category=&sort=',
      )
      .then(function (response) {
        console.log(response, 'res');
        setApiData(response?.data?.data?.data);
        setArea(response?.data?.data?.data?.areas);
      })
      .catch(function (error) {
        // handle error
        alert("Couldn't load Data");
      });
  };

  useEffect(() => {
    fetchBusiness();
  }, []);

  // useEffect(() => {
  //   console.log('api data', apiData);
  //   console.log('area', area);
  // }, [apiData]);

  return (
    <View style={{flex: 1}}>
      {/* <ImageBackground
        source={require('../styles/images/background.jpg')}
        resizeMode="cover"
        style={styles.image}
      /> */}
      <LinearGradient
        colors={['#4F0D04', '#400000', '#000']}
        style={styles.linearGradient}>
        <View style={styles?.homeContainer}>
          <View style={styles?.heading}>
            {/* <Image
            style={styles?.backBtn}
            source={require('../styles/icons/white-arrow-icon.png')}
          /> */}
            <Text style={styles?.searchText}>Search</Text>
            <View />
          </View>

          <View style={styles?.cityName}>
            <Text
              onPress={() => navigation.navigate('City Selection')}
              style={{color: '#fff', fontSize: 18}}>
              City Name
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
              placeholderTextColor="#fff"
            />
            <Image
              style={styles?.searchIcon}
              source={require('../styles/icons/search-icon.png')}
            />
          </View>

          <View style={styles?.btnsContainer}>
            <Text
              style={[
                styles?.bizBtn,
                businessTab ? styles?.orangeBg : styles?.whiteBg,
              ]}
              onPress={() => {
                setBusinessTab(true);
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
              }}>
              Deals
            </Text>
          </View>

          <FlatList
            data={apiData}
            renderItem={BusinessList}
            keyExtractor={item => item.id}
          />
        </View>
        <SortAndFilter />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 0,
    // opacity: 1,
  },
  homeContainer: {
    flex: 1,
    padding: 15,
    paddingBottom: 0,
  },
  image: {
    flex: 1,
    opacity: 0.5,
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
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  cityName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#fff',
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
  btnsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bizBtn: {
    width: '48%',
    backgroundColor: 'orange',
    borderRadius: 30,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color: '#fff',
    fontWeight: '650',
    fontSize: 18,
  },
  dealsBtn: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 30,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color: 'black',
    fontWeight: '650',
    fontSize: 18,
  },
  orangeBg: {
    backgroundColor: 'orange',
    color: '#fff',
  },
  whiteBg: {
    backgroundColor: '#fff',
    color: 'black',
  },
});

export default HomePage;
