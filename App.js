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

const App = () => {
  const handleLine1Press = () => {
    console.log('line 1 pressed');
  };
  const [searchValue, setSearchValue] = useState('');
  const [cardData, setCardData] = useState([
    {
      title: 'Thodile Lodge',
      category: 'Lodge',
      area: 'Kilimnorr',
      other: ['Room Rental,', 'Door Metry'],
      image: './styles/images/1.png',
    },
    {
      title: 'Pejdnlwe Lwnwodge',
      category: 'Hotel',
      area: 'Nheiworr',
      other: ['Bwwqwd Rental,', 'Door Metry'],
      image: './styles/images/2.jpeg',
    },
    {
      title: 'Qhuwc Lodge',
      category: 'Lodge',
      area: 'Kilimnorr',
      other: ['Pwjwiww,', 'Door Metry'],
      image: './styles/images/3.jpeg',
    },
    {
      title: 'Lniwuww Lodge',
      category: 'Lodge',
      area: 'Kilimnorr',
      other: ['Room Rental,', 'Door Metry'],
      image: './styles/images/4.png',
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
      <View style={styles?.mainContainer}>
        <Heading headingName={'Search'} />
        {/* <HomePage /> */}

        <View style={styles?.cityName}>
          <Text style={{color: '#fff', fontSize: 18}}>City Name</Text>
          <Image
            style={styles?.cityDropDown}
            source={require('./styles/icons/downArrow.png')}
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
          />
        </View>

        <View style={styles?.btnsContainer}>
          <Text
            style={styles?.bizBtn}
            // onPress={onPressLearnMore}
          >
            Businesses
          </Text>
          <Text
            style={styles?.dealsBtn}
            // onPress={onPressLearnMore}
          >
            Deals
          </Text>
        </View>

        <FlatList
          data={cardData}
          renderItem={({item}) => (
            <View style={styles?.cardsContainer}>
              <View style={styles?.cardLhs}>
                <Image
                  style={styles?.listImage}
                  source={require('./styles/images/1.jpg')}
                />
              </View>
              <View style={styles?.cardRhs}>
                <Text style={{fontSize: 16, color: '#fff', fontWeight: '650'}}>
                  {item?.title}
                </Text>
                <Text style={styles?.rhsText}>Category : {item?.category}</Text>
                <Text style={styles?.rhsText}>Area : {item?.area}</Text>
                <Text style={styles?.rhsText}>{item?.other}</Text>
              </View>
            </View>
          )}
        />
      </View>
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
  mainContainer: {
    flex: 1,
    // backgroundColor: 'black',
    padding: 15,
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
    backgroundColor: 'white',
    borderRadius: 40,
    paddingLeft: 20,
    marginBottom: 12,
  },
  citySearchInput: {
    borderRadius: 10,
    fontSize: 18,
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
    backgroundColor: 'white',
    borderRadius: 30,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color: 'black',
    fontWeight: '650',
    fontSize: 18,
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 14,
    // minHeight: 100,
    marginBottom: 15,
    backgroundColor: '#1D1F1C',
  },
  cardLhs: {
    width: '32%',
    backgroundColor: 'dodgerblue',
    borderRadius: 14,
    height: 90,
    marginRight: 15,
  },
  listImage: {
    flex: 1,
    width: '100%',
    borderRadius: 14,
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
// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One uw">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
