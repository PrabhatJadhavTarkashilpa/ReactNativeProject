import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CategoryList from '../components/category_list';
import Loader from '../components/loader';
import axios from 'react-native-axios';
import {useStoreState} from 'easy-peasy';

function FilterPage({navigation}) {
  const [categoryData, setCategoryData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [selectedArea, setSelectedArea] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedType, setSelectedType] = useState([]);
  const businessTypes = ['Individual', 'Shop/Office'];

  const selectedCity = useStoreState(state => state.city);

  const fetchCategories = () => {
    setShowLoader(true);
    axios
      .get(`https://admin.haavoo.com/api/category`)
      .then(function (response) {
        // console.log('category data', response?.data?.data);
        setCategoryData(response?.data?.data);
        setShowLoader(false);
      })
      .catch(function (error) {
        // handle error
        alert("Couldn't load Categories");
        setShowLoader(false);
      });
  };

  const fetchAreas = () => {
    setShowLoader(true);
    let url = `https://admin.haavoo.com/api/area?city=${selectedCity}`;
    axios
      .get(url)
      .then(function (response) {
        setAreaData(response?.data?.data);
        setShowLoader(false);
        // console.log('area', response?.data?.data);
      })
      .catch(function (error) {
        alert(error.message);
        setShowLoader(false);
      });
  };

  useEffect(() => {
    fetchAreas();
  }, [selectedCity]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log('selected area', selectedArea);
  }, [selectedArea]);

  return (
    <View style={{flex: 1}}>
      {showLoader && <Loader />}
      <LinearGradient
        colors={['#4F0D04', '#400000', '#000']}
        style={styles.linearGradient}>
        <View style={styles?.heading}>
          <TouchableOpacity onPress={() => navigation.navigate('Home Page')}>
            <Image
              style={styles?.backBtn}
              source={require('../styles/icons/white-arrow-icon.png')}
            />
          </TouchableOpacity>

          <Text numberOfLines={1} style={styles?.searchText}>
            Filter
          </Text>
          <View />
        </View>

        <ScrollView style={{flex: 1}}>
          <View style={styles?.businessSelectorContainer}>
            <Text style={{color: '#fff', fontSize: 18}}>Type Business</Text>
            <View style={styles?.btnContainer}>
              {businessTypes?.map((type, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      if (selectedType?.includes(type)) {
                        let copy = [...selectedType];
                        let index = copy?.findIndex(
                          element => (element = type),
                        );
                        copy?.splice(index, 1);
                        setSelectedType(copy);
                      } else {
                        setSelectedType([...selectedType, type]);
                      }
                    }}
                    key={index}>
                    <Text
                      style={[
                        styles?.typeBtns,
                        selectedType?.includes(type)
                          ? styles?.selectedTypeBtns
                          : '',
                      ]}>
                      {type}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles?.categoryAreaContainer}>
            <CategoryList categoryData={categoryData} />
          </View>

          <Text style={styles?.areaHeading}>Areas</Text>
          {areaData?.map((area, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  const copy = [...selectedArea];
                  if (copy?.includes(area?.slug)) {
                    let itemIndex = selectedArea?.findIndex(
                      element => element === area?.slug,
                    );
                    copy?.splice(itemIndex, 1);
                  } else {
                    copy?.push(area?.slug);
                  }
                  setSelectedArea(copy);
                }}>
                <View style={styles.checkboxContainer}>
                  <View style={styles.checkbox}>
                    <View
                      style={
                        selectedArea?.includes(area?.slug) ||
                        selectedArea == area?.slug
                          ? styles.checkboxInside
                          : ''
                      }
                    />
                  </View>
                  <Text style={styles.areaText}> {area?.name}</Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 0,
    padding: 15,
    paddingBottom: 0,
  },
  mainContainer: {
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
  searchText: {
    color: 'white',
    fontSize: 18,
  },
  backBtn: {
    height: 20,
    width: 20,
    transform: [{rotate: '90deg'}],
  },
  businessSelectorContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  typeBtns: {
    padding: 8,
    color: '#fff',
    fontSize: 14,
    borderColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderStyle: 'solid',
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#1D1F1C',
  },
  selectedTypeBtns: {
    backgroundColor: 'orange',
  },
  categoryAreaContainer: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#fff',
    borderStyle: 'solid',
    borderRadius: 10,
  },
  categoryHeading: {
    color: '#fff',
    fontSize: 18,
    padding: 14,
    backgroundColor: '#1D1F1A',
    borderRadius: 14,
  },
  areaHeading: {
    marginTop: 22,
    marginBottom: 22,
    color: '#fff',
    fontSize: 18,
    paddingLeft: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
  },
  checkbox: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: 18,
    height: 18,
    marginBottom: 15,
    marginTop: 10,
  },
  checkboxInside: {
    backgroundColor: 'orange',
    width: 14,
    height: 14,
    marginLeft: 2,
    marginTop: 2,
  },
  areaText: {
    paddingLeft: 6,
    color: '#fff',
    fontSize: 14,
    paddingBottom: 6,
  },
});

export default FilterPage;
