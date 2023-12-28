import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../../components/Header';
import Calorias from '../../components/Calories';
import useFoodStorage from '../../hooks/useFoodStorage';
import {useFocusEffect} from '@react-navigation/native';
import {Meal} from '../../types';

const Home = () => {
  const {onGetTodayFood} = useFoodStorage();
  const [todayFood, setTodayFood] = useState<Meal[]>([]);

  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = await onGetTodayFood();
      setTodayFood(todayFoodResponse);
    } catch (error) {
      setTodayFood([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTodayFood().catch(null);
    }, [loadTodayFood]),
  );

  console.log(todayFood);

  return (
    <View style={styles.container}>
      <Header />
      <Calorias />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});

export default Home;
