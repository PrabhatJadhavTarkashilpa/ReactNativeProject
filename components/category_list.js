import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {useState} from 'react/cjs/react.development';

function CategoryList({categoryData}) {
  const category = useStoreState(state => state.filterCategory);
  const [selectCategory, setSelectCategory] = useState(category);
  const [subpartShow, setSubpartShow] = useState(null);

  const city = useStoreState(state => state.city);
  const setCategory = useStoreActions(actions => actions.setFilterCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Category</Text>
      <ScrollView style={styles.scrollView}>
        {categoryData?.length > 0 &&
          categoryData?.map((item, index) => {
            console.log(item, 'data');
            return (
              <Pressable
                // onPress={() => {
                //   const newSelectCategory = [...selectCategory];
                //   if (newSelectCategory?.includes(item.slug)) {
                //     let itemIndex = selectCategory?.findIndex(
                //       tm => tm === item?.slug,
                //     );
                //     newSelectCategory?.splice(itemIndex, 1);
                //   } else {
                //     newSelectCategory?.push(item?.slug);
                //   }
                //   setSelectCategory(newSelectCategory);
                // }}
                key={index}>
                <View style={styles.checkboxMainContainer}>
                  <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox}>
                      {/* <View
                        style={
                          selectCategory?.includes(item?.slug)
                            ? styles.checkboxInside
                            : ''
                        }></View> */}
                    </View>
                    <Text style={styles.areaText}> {item?.name}</Text>
                  </View>
                  <TouchableOpacity
                  // onPress={() => {
                  //   if (subpartShow === index) {
                  //     setSubpartShow(null);
                  //   } else {
                  //     setSubpartShow(index);
                  //   }
                  // }}
                  >
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
                          // onPress={() => {
                          //   console.log('sub clicked', sub);
                          //   const newSelectCategory = [...selectCategory];
                          //   if (newSelectCategory?.includes(sub)) {
                          //     let itemIndex = selectCategory?.findIndex(
                          //       tm => tm === sub?.slug,
                          //     );
                          //     newSelectCategory?.splice(itemIndex, 1);
                          //   } else {
                          //     newSelectCategory?.push(sub?.slug);
                          //   }
                          //   setSelectCategory(newSelectCategory);
                          // }}
                        >
                          <View style={styles.checkboxSubpartContainer}>
                            <View style={styles.checkbox}>
                              {/* <View
                                style={
                                  selectCategory?.includes(sub?.slug) ||
                                  selectCategory == categoryData?.slug
                                    ? styles.checkboxInside
                                    : ''
                                }></View> */}
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
  mainText: {
    fontSize: 20,
    fontWeight: '600',
    padding: 15,
    backgroundColor: '#440000',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    width: 20,
    height: 20,
    marginBottom: 15,
    marginTop: 10,
  },
  checkboxInside: {
    backgroundColor: 'yellow',
    width: 14,
    height: 14,
    margin: 3,
  },
  areaText: {
    paddingLeft: 10,
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
