/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  View,
  TextInput,
  Button,
  FlatList,
  ImageBackground,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Heading from './components/heading';
import HomePage from './pages/home_page';
import LinearGradient from 'react-native-linear-gradient';
import SortAndFilter from './components/sort_filter';

const App = () => {
  const handleLine1Press = () => {
    console.log('line 1 pressed');
  };

  const [cardData, setCardData] = useState([
    {
      title: 'Thodile Lodge',
      category: 'Lodge',
      area: 'Kilimnorr',
      other: ['Room Rental,', 'Door Metry'],
      image: require('./styles/images/1.jpg'),
    },
    {
      title: 'Pejdnlwe Lwnwodge',
      category: 'Hotel',
      area: 'Nheiworr',
      other: ['Bwwqwd Rental,', 'Door Metry'],
      image: require('./styles/images/2.jpeg'),
    },
    {
      title: 'Qhuwc Lodge',
      category: 'Lodge',
      area: 'Kilimnorr',
      other: ['Pwjwiww,', 'Door Metry'],
      image: require('./styles/images/3.jpeg'),
    },
    {
      title: 'Lniwuww Lodge',
      category: 'Lodge',
      area: 'Kilimnorr',
      other: ['Room Rental,', 'Door Metry'],
      image: require('./styles/images/4.jpg'),
    },
  ]);

  return (
    <LinearGradient
      colors={['#4F0D04', '#400000', '#000']}
      style={styles.linearGradient}>
      {/* <ImageBackground
        source={require('./styles/images/background.jpg')}
        resizeMode="cover"
        style={styles.image}> */}

      <HomePage />
      <SortAndFilter />

      {/* </ImageBackground> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    // opacity: 0.2,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 0,
    // opacity: 1,
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 14,
    // minHeight: 100,
    marginBottom: 15,
    backgroundColor: '#1D1F1C',
  },
  cardLhs: {
    width: '32%',
    backgroundColor: 'dodgerblue',
    borderRadius: 10,
    height: 90,
    marginRight: 15,
  },
  listImage: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
  },
  cardRhs: {
    flex: 1,
    height: 90,
    // justifyContent: 'center',
    paddingTop: 6,
  },
  rhsText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '400',
  },
});

export default App;
