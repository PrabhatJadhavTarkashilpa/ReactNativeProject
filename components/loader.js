import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View style={styles.logoContainer}>
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
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.35,
  },
  image: {
    height: 60,
    width: 60,
  },
});
