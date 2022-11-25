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
import CitySelectionPage from './pages/city_selection_page';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StoreProvider} from 'easy-peasy';
import Store from './store/userData';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

const App = () => {
  return (
    <StoreProvider store={Store}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home Page" component={HomePage} />
          <Stack.Screen name="City Selection" component={CitySelectionPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>

    //  <ImageBackground
    //   source={require('./styles/images/background.jpg')}
    //   resizeMode="cover"
    //   style={styles.image}/>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    // opacity: 0.2,
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
