import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'react-native-axios';

function CitySelectionPage({navigation}) {
  const [searchValue, setSearchValue] = useState('');
  const [cityCards, setCityCards] = useState([
    {
      title: 'Ernakulam',
      image: require('../styles/icons/ernakulam.png'),
    },
    {
      title: 'Kozhikode',
      image: require('../styles/icons/kozhikode.png'),
    },
    {
      title: 'Malappuram',
      image: require('../styles/icons/malappuram.png'),
    },
    {
      title: 'Thiruvananthapuram',
      image: require('../styles/icons/tiruanathpuram.png'),
      isSelected: true,
    },
    {
      title: 'Thrissur',
      image: require('../styles/icons/thrisur.png'),
    },
  ]);
  // https://staging.admin.haavoo.com/api/city

  // const [cityList, setCityList] = useState([
  //   'Aisow',
  //   'Isuwww',
  //   'Knauw',
  //   'Kahsuw',
  //   'Kollamw',
  //   'Kotaygw',
  //   'Palakjed',
  //   'Palaiuew',
  //   'Waaian',
  // ]);

  const [cityList, setCityList] = useState([]);

  const getCityNames = cityArray => {
    let cityArr = [];
    cityArray?.map(city => {
      cityArr?.push(city?.name);
    });
    setCityList(cityArr);
  };

  const fetchCities = () => {
    axios
      .get(`https://staging.admin.haavoo.com/api/city`)
      .then(function (response) {
        console.log('city', response?.data?.data);
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

  return (
    <LinearGradient
      colors={['#4F0D04', '#400000', '#000']}
      style={styles.linearGradient}>
      <View style={styles?.citySelectionContainer}>
        <View style={styles?.heading}>
          <TouchableOpacity onPress={() => navigation.navigate('Home Page')}>
            <Image
              style={styles?.backBtn}
              source={require('../styles/icons/white-arrow-icon.png')}
            />
          </TouchableOpacity>

          <Text numberOfLines={1} style={styles?.searchText}>
            Search Your City or Location for niwnewo
          </Text>
          <View />
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

        <ScrollView>
          <Text style={{color: '#fff', fontSize: 18, marginTop: 12}}>
            Popular Cities
          </Text>

          <View style={styles?.cityCardContainer}>
            {cityCards?.map((data, index) => {
              return (
                <View
                  style={[
                    styles?.cityCard,
                    data?.isSelected ? styles?.selectedBorder : '',
                  ]}
                  key={index}>
                  <Image style={styles?.cityImage} source={data?.image} />
                  <Text style={{color: '#fff', textAlign: 'center'}}>
                    {data?.title}
                  </Text>
                </View>
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
                <Text key={index} style={styles?.cityNames}>
                  {data}
                </Text>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 0,
    // opacity: 1,
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
    paddingTop: 15,
    // backgroundColor: 'white',
    height: 300,
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
    borderWidth: 0.5,
    borderColor: '#fff',
    borderStyle: 'solid',
    paddingLeft: 10,
    paddingRight: 10,
  },
  cityImage: {
    width: 50,
    height: '65%',
    marginBottom: 6,
  },
  selectedBorder: {
    borderWidth: 1,
    borderColor: 'orange',
  },
  cityNames: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 15,
  },
});

export default CitySelectionPage;
