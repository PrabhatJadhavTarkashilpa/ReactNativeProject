import React from 'react';
import {Image, Text, View} from 'react-native';

function Heading(props) {
  return <View></View>;
}

const styles = {
  heading: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtn: {
    height: 20,
    width: 20,
  },
  searchText: {
    color: 'white',
    fontSize: 18,
  },
};

export default Heading;
