import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  Alert,
  Image,
} from 'react-native';
import React from 'react';
import {useState} from 'react/cjs/react.development';
import {useStoreActions, useStoreState} from 'easy-peasy';

function SortModal(props) {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={props?.showSortModal}
      onRequestClose={() => {
        props?.setShowSortModal(!props?.showSortModal);
      }}
      style={styles?.modalStyle}>
      <View style={styles.centeredView}>
        <View
          style={[styles.modalView, {backgroundColor: 'rgba(0, 0, 0, 0.6)'}]}>
          <View style={styles.background}>
            <Pressable
              style={styles.closebtn}
              onPress={() => props?.setShowSortModal(!props?.showSortModal)}>
              <Image
                style={styles.closeIcon}
                source={require('../styles/icons/closeicon.png')}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                // setPopularity('relevance');
                if (props?.sortValue == 'relevance') {
                  props?.setSortValue('');
                } else {
                  props?.setSortValue('relevance');
                }
                props?.setShowSortModal(false);
              }}>
              <View style={styles.checkboxContainer}>
                <Text style={styles.modalText}> Relevance </Text>
                <View style={styles.checkbox}>
                  <View
                    style={
                      props?.sortValue === 'relevance'
                        ? styles.checkboxInside
                        : ''
                    }></View>
                </View>
              </View>
            </Pressable>
            <View
              style={{width: '100%', height: 1, backgroundColor: 'white'}}
            />
            <Pressable
              onPress={() => {
                // setPopularity('popularity');
                if (props?.sortValue == 'popularity') {
                  props?.setSortValue('');
                } else {
                  props?.setSortValue('popularity');
                }
                props?.setShowSortModal(false);
              }}>
              <View style={styles.checkboxContainer}>
                <Text style={styles.modalText}> Popularity </Text>
                <View style={styles.checkbox}>
                  <View
                    style={
                      props?.sortValue === 'popularity'
                        ? styles.checkboxInside
                        : ''
                    }></View>
                </View>
              </View>
            </Pressable>
            <View
              style={{width: '100%', height: 1, backgroundColor: 'white'}}
            />
            <Pressable
              onPress={() => {
                // setPopularity('popularity');
                if (props?.sortValue == 'distance') {
                  props?.setSortValue('');
                } else {
                  props?.setSortValue('distance');
                }
                props?.setShowSortModal(false);
              }}>
              <View style={styles.checkboxContainer}>
                <Text style={styles.modalText}> Distance </Text>
                <View style={styles.checkbox}>
                  <View
                    style={
                      props?.sortValue === 'distance'
                        ? styles.checkboxInside
                        : ''
                    }></View>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingBottom: 100,
  },
  modalView: {
    borderRadius: 0,
    shadowColor: '#000',
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 15,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dad8d8',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: 'transparent',
  },
  buttonClose: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 20,
  },
  modalText: {
    marginBottom: 15,
    marginTop: 10,
    // textAlign: 'center',
    color: 'white',
  },
  sortIcon: {
    width: 20,
    height: 20,
  },
  closeIcon: {
    width: 20,
    height: 20,
    marginBottom: 10,
  },
  closebtn: {
    left: '50%',
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 20,
    top: '80%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkbox: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: 20,
    height: 20,
    marginBottom: 15,
    marginTop: 10,
  },
  checkboxInside: {
    backgroundColor: 'orange',
    width: 14,
    height: 14,
    margin: 3,
  },
});

export default SortModal;
