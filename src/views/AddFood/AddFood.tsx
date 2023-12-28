import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import Header from '../../components/Header';
import {Button, Icon, Input} from '@rneui/themed';
import AddFoodModal from '../../components/AddFoodModal';
import useFoodStorage from '../../hooks/useFoodStorage';
import {Meal} from '../../types';

const AddFood = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const {onGetFood} = useFoodStorage();
  const [foods, setFoods] = useState<Meal[]>([]);
  const loadFoods = async () => {
    try {
      const foodsResponse = await onGetFood();
      setFoods(foodsResponse);
    } catch (error) {
      console.log(error);
    }
  };
  const handleModalClose = async (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      Alert.alert('The food was saved successfully.');
      loadFoods();
    }
    setIsVisible(false);
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text>Add Food</Text>
        </View>
        <View style={styles.addFoodBtnContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color="#FFFFFF" />}
            radius={'lg'}
            color={'#4ECB71'}
            onPress={() => setIsVisible(true)}
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input placeholder="apples, pie, soda..." />
        </View>
        <Button
          title={'Search'}
          radius={'lg'}
          color={'#ADE8AF'}
          titleStyle={styles.searchBtnTitle}
        />
      </View>
      <AddFoodModal visible={visible} onClose={handleModalClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#fff',
    flex: 1,
  },
  addFoodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  legendContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  addFoodBtnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  searchContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    marginLeft: -12,
  },
  searchBtnTitle: {
    color: '#000',
    fontSize: 14,
  },
});

export default AddFood;
