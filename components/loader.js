import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const Loader = ({showLoader}) => {
  return (
    <View style={styles.logoContainer}>
      {showLoader && (
        <View>
          <Image
            style={styles.image}
            source={require('../styles/icons/logogif.gif')}
          />
        </View>
      )}
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    zIndex: 1000,
    top: '50%',
    left: '40%',
    // transform: [{translateY: -50}],
    backgroundColor: 'transparent',
  },
  image: {
    height: 60,
    width: 60,
  },
});
