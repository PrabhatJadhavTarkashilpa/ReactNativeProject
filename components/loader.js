import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View style={styles.logoContainer}>
      <View style={styles?.loaderBg} />
      <Image
        style={styles.image}
        source={require('../styles/icons/logogif.gif')}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  logoContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBg: {
    flex: 1,
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    opacity: 0.65,
  },
  image: {
    height: 60,
    width: 60,
    // zIndex: 1000,
  },
});
