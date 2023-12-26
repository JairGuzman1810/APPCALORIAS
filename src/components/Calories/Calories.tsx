import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from '@rneui/themed';
import {Icon} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../../types';

const Calories = () => {
  const {navigate} =
    useNavigation<StackNavigationProp<RootStackParamsList, 'Home'>>();
  const handleAddCaloriesPress = () => {
    navigate('AddFood');
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftcontainer}>
        <Text>Calories</Text>
      </View>
      <View style={styles.rightcontainer}>
        <Button
          icon={<Icon name="add-circle-outline" color="#FFFFFF" />}
          radius={'lg'}
          color={'#4ECB71'}
          onPress={handleAddCaloriesPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 24,
    flexDirection: 'row',
  },
  leftcontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightcontainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  caloriesLegend: {
    fontSize: 20,
  },
});

export default Calories;
