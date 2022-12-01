import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

function BusinessList(props) {
  const regex = /(<([^>]+)>)/gi;
  const temp = props?.item?.description.replace(regex, '');
  var description = temp?.replace(/&nbsp;/g, '');
  // console.log(props?.item.thumb_image);
  var img = `https://staging.admin.haavoo.com/app-images/${props?.item?.thumb_image}`;

  return (
    <View key={props?.item?.id} style={styles?.cardsContainer}>
      <View style={styles?.cardLhs}>
        <Image
          style={styles?.listImage}
          source={{
            uri: `${img}`,
          }}
        />
      </View>
      <View style={styles?.cardRhs}>
        <Text style={{fontSize: 16, color: '#fdfffd', fontWeight: '650'}}>
          {props?.item?.business_name}
        </Text>
        <Text style={styles?.rhsText}>
          Category : {props?.item?.categories[0]?.name}
        </Text>
        <Text style={styles?.rhsText}>
          Area : {props?.item?.areas[0]?.name}
        </Text>
        <Text numberOfLines={3} style={styles?.rhsText}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 14,
    // minHeight: 100,
    marginBottom: 15,
    backgroundColor: '#2b201d',
    borderWidth: 0.5,
    borderColor: '#fdfffd',
    borderStyle: 'solid',
  },
  cardLhs: {
    width: '32%',
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
    color: '#fdfffd',
    fontSize: 10,
    fontWeight: '400',
  },
});

export default BusinessList;
