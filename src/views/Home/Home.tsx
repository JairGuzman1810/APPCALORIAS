import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../../components/Header';
import Calorias from '../../components/Calories';
import useFoodStorage from '../../hooks/useFoodStorage';
import {useFocusEffect} from '@react-navigation/native';
import {Meal} from '../../types';
import TodayCalories, {
  TodayCaloriesProps,
} from '../../components/TodayCalories';
import TodayMeals from '../../components/TodayMeals';

const totalCaloriesPerDay = 2000;

const Home = () => {
  const {onGetTodayFood} = useFoodStorage();
  const [todayFood, setTodayFood] = useState<Meal[]>([]);
  const [todayStats, setTodayStats] = useState<TodayCaloriesProps>({
    consumed: 0,
    percentage: 0,
    remaining: 0,
    total: totalCaloriesPerDay,
  });

  const caculateTodayStats = (meals: Meal[]) => {
    try {
      //Suma de todas las calorias del dia.
      const consumedCalories = meals.reduce(
        (acum, curr) => acum + Number(curr.calories), //Suma del acumulado con el no. cals.
        0, //Inica el acomulador en 0
      );
      const remainingCalories = totalCaloriesPerDay - consumedCalories;

      const percentage = (consumedCalories / totalCaloriesPerDay) * 100;

      setTodayStats({
        consumed: consumedCalories,
        percentage,
        remaining: remainingCalories,
        total: totalCaloriesPerDay,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = await onGetTodayFood();
      setTodayFood(todayFoodResponse);
      caculateTodayStats(todayFoodResponse);
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

  return (
    <View style={styles.container}>
      <Header />
      <Calorias />
      <TodayCalories {...todayStats} />
      <TodayMeals foods={todayFood} onCompleteAddRemove={loadTodayFood} />
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
