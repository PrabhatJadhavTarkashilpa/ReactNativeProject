import React from 'react';
import {View} from 'react-native';

function NoDataFound(props) {
  return (
    <View>
      <Text>Sorry, no {props?.text ? props?.text : 'data'} found</Text>
    </View>
  );
}

export default NoDataFound;
