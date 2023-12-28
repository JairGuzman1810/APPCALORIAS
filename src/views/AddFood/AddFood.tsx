import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import Header from '../../components/Header';
import {Button, Icon, Input} from '@rneui/themed';
import AddFoodModal from '../../components/AddFoodModal';
import useFoodStorage from '../../hooks/useFoodStorage';
import {Meal} from '../../types';
import {ScrollView} from 'react-native-gesture-handler';
import MealItem from '../../components/MealItem';

const AddFood = () => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const {onGetFood} = useFoodStorage();
  const [foods, setFoods] = useState<Meal[]>([]);
  const [search, setSearch] = useState<string>('');

  const loadFoods = async () => {
    try {
      const foodsResponse = await onGetFood();
      setFoods(foodsResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFoods().catch(null);
  }, []);

  const handleModalClose = async (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      Alert.alert('The food was saved successfully.');
      loadFoods();
    }
    setIsVisible(false);
  };
  //Metodo llamado
  const handleSearchPress = async () => {
    try {
      //Se obtiene las comidas.
      const result = await onGetFood();
      //Se filtra el json por el nombre, los cuales tienen que tener lo que se encuentra en la barra de busqueda.
      setFoods(
        result.filter((item: Meal) =>
          item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        ),
      );
    } catch (error) {
      console.log(error);
    }
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
          <Input
            placeholder="apples, pie, soda..."
            value={search}
            onChangeText={(text: string) => setSearch(text)}
          />
        </View>
        <Button
          title={'Search'}
          radius={'lg'}
          color={'#ADE8AF'}
          titleStyle={styles.searchBtnTitle}
          onPress={handleSearchPress}
        />
      </View>
      <ScrollView style={styles.content}>
        {foods?.map(meal => (
          <MealItem key={`my-meal-item-${meal.name}`} {...meal} />
        ))}
      </ScrollView>
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
  content: {},
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
