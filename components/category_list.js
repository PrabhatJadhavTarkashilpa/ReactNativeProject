import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {useState} from 'react/cjs/react.development';

function CategoryList(props) {
  // const [selectCategory, setSelectCategory] = useState([]);
  const [subpartShow, setSubpartShow] = useState(null);

  const selectCategoryStore = useStoreState(state => state.category);

  useEffect(() => {
    console.log('cate', props?.selectCategory);
    console.log('store cate', selectCategoryStore);
  }, [props?.selectCategory]);

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Category</Text>
      <ScrollView style={styles.scrollView}>
        {props?.categoryData?.length > 0 &&
          props?.categoryData?.map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  const copy = [...props?.selectCategory];
                  if (copy?.includes(item?.slug)) {
                    let itemIndex = props?.selectCategory?.findIndex(
                      element => element === item?.slug,
                    );
                    copy?.splice(itemIndex, 1);
                  } else {
                    copy?.push(item?.slug);
                    item?.child?.map(subData => {
                      if (copy?.includes(subData?.slug)) {
                        let subIndex = copy?.findIndex(
                          element => element === subData?.slug,
                        );
                        copy?.splice(subIndex, 1);
                      }
                    });
                  }
                  props?.setSelectCategory(copy);
                }}
                key={index}>
                <View style={styles.checkboxMainContainer}>
                  <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox}>
                      <View
                        style={
                          props?.selectCategory?.includes(item?.slug)
                            ? styles.checkboxInside
                            : ''
                        }
                      />
                    </View>
                    <Text style={styles.areaText}> {item?.name}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      if (subpartShow === index) {
                        setSubpartShow(null);
                      } else {
                        setSubpartShow(index);
                      }
                    }}>
                    <Image
                      style={styles.downArrow}
                      source={require('../styles/icons/downArrow.png')}
                    />
                  </TouchableOpacity>
                </View>
                {subpartShow === index && (
                  <View style={styles.subpartMargin}>
                    {item?.child?.map((sub, index) => {
                      return (
                        <Pressable
                          key={index}
                          onPress={() => {
                            const copy = [...props?.selectCategory];
                            if (copy?.includes(item?.slug)) {
                              let itemIndex = props?.selectCategory?.findIndex(
                                element => element === item?.slug,
                              );
                              copy?.splice(itemIndex, 1);
                              item?.child?.map(subData => {
                                if (subData != sub) {
                                  copy?.push(subData?.slug);
                                }
                              });
                            } else if (copy?.includes(sub?.slug)) {
                              let subIndex = props?.selectCategory?.findIndex(
                                element => element === sub?.slug,
                              );
                              copy?.splice(subIndex, 1);
                            } else {
                              copy?.push(sub?.slug);
                            }
                            props?.setSelectCategory(copy);
                          }}>
                          <View style={styles.checkboxSubpartContainer}>
                            <View style={styles.checkbox}>
                              <View
                                style={
                                  props?.selectCategory?.includes(item?.slug) ||
                                  props?.selectCategory?.includes(sub?.slug)
                                    ? styles.checkboxInside
                                    : ''
                                }
                              />
                            </View>
                            <Text style={styles.areaText}> {sub?.name}</Text>
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </Pressable>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  headingText: {
    fontSize: 18,
    fontWeight: '600',
    padding: 15,
    backgroundColor: 'gray',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxSubpartContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
  },
  checkboxMainContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: 18,
    height: 18,
    marginBottom: 15,
    marginTop: 10,
  },
  checkboxInside: {
    backgroundColor: 'orange',
    width: 14,
    height: 14,
    marginLeft: 2,
    marginTop: 2,
  },
  areaText: {
    paddingLeft: 6,
    color: '#fff',
    fontSize: 14,
    paddingBottom: 6,
  },
  subpartMargin: {
    margin: 10,
    marginTop: 0,
  },
  main: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  downArrow: {
    width: 20,
    height: 20,
  },
});

export default CategoryList;
