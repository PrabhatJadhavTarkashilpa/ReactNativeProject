import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

function BusinessList(props) {
  const regex = /(<([^>]+)>)/gi;
  // const temp = props?.item?.item?.description?.replace(regex, '');
  const temp = props?.item?.item?.attributes?.businessDescription?.replace(
    regex,
    '',
  );
  var description = temp?.replace(/&nbsp;/g, '');
  console.log(props?.item?.item.thumb_image);
  // var img = `https://staging.admin.haavoo.com/app-images/${props?.item?.item?.thumb_image}`;
  var img = `https://admin.haavoo.com/app-images/${props?.item?.item?.thumb_image}`;
  console.log('image', props?.item?.item?.thumb_image);
  const [imageSource, setImageSource] = useState({uri: `${img}`});

  return (
    <View key={props?.item?.item?.id} style={styles?.cardsContainer}>
      <View key={props?.item?.item?.id} style={styles?.cardsContainerBg}></View>
      <View style={styles?.cardLhs}>
        <Image
          style={styles?.listImage}
          source={imageSource}
          onError={() => {
            setImageSource(require('../styles/images/eg.jpg'));
          }}
        />
      </View>
      <View style={styles?.cardRhs}>
        <Text style={{fontSize: 16, color: '#fdfffd', fontWeight: '650'}}>
          {/* {props?.item?.item?.business_name} */}
          {props?.item?.item?.attributes?.businessName}
        </Text>
        <Text style={styles?.rhsText}>
          {/* Category : {props?.item?.item?.categories[0]?.name} */}
          Category : {props?.item?.item?.attributes?.category}
        </Text>
        <Text style={styles?.rhsText}>
          {/* Area : {props?.item?.item?.areas[0]?.name} */}
          Area : {props?.item?.item?.attributes?.area}
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
    borderWidth: 0.5,
    borderColor: '#fdfffd',
    borderStyle: 'solid',
  },
  cardsContainerBg: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 14,
    backgroundColor: '#2b201d',
    opacity: 0.4,
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
