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

function CategoryList({categoryData}) {
  const category = useStoreState(state => state.filterCategory);
  const [selectCategory, setSelectCategory] = useState([]);
  const [subpartShow, setSubpartShow] = useState(null);

  const city = useStoreState(state => state.city);
  const setCategory = useStoreActions(actions => actions.setFilterCategory);

  useEffect(() => {
    console.log('cate', selectCategory);
  }, [selectCategory]);

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Category</Text>
      <ScrollView style={styles.scrollView}>
        {categoryData?.length > 0 &&
          categoryData?.map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  const copy = [...selectCategory];
                  if (copy?.includes(item?.slug)) {
                    let itemIndex = selectCategory?.findIndex(
                      element => element === item?.slug,
                    );
                    copy?.splice(itemIndex, 1);
                  } else {
                    copy?.push(item?.slug);
                  }
                  setSelectCategory(copy);
                }}
                key={index}>
                <View style={styles.checkboxMainContainer}>
                  <View style={styles.checkboxContainer}>
                    <View style={styles.checkbox}>
                      <View
                        style={
                          selectCategory?.includes(item?.slug)
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
                            const copy = [...selectCategory];
                            if (copy?.includes(sub?.slug)) {
                              let itemIndex = selectCategory?.findIndex(
                                element => element === sub?.slug,
                              );
                              copy?.splice(itemIndex, 1);
                            } else {
                              copy?.push(sub?.slug);
                            }
                            setSelectCategory(copy);
                          }}>
                          <View style={styles.checkboxSubpartContainer}>
                            <View style={styles.checkbox}>
                              <View
                                style={
                                  selectCategory?.includes(sub?.slug) ||
                                  selectCategory == categoryData?.slug
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
