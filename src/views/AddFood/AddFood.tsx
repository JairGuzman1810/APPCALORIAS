import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Header from '../../components/Header';
import {Button, Icon, Input} from '@rneui/themed';

const AddFood = () => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 12},
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
