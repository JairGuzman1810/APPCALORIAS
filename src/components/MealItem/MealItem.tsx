import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Meal} from '../../types';
import {Button} from '@rneui/themed';
import {Icon} from '@rneui/base';
import useFoodStorage from '../../hooks/useFoodStorage';

type MealItemProps = Meal & {
  isAbleToAdd?: boolean;
  onCompleteAddRemove?: () => void;
  itemPosition?: number;
};

const MealItem: FC<MealItemProps> = ({
  calories,
  name,
  portion,
  isAbleToAdd,
  itemPosition,
  onCompleteAddRemove,
}) => {
  const {onSaveTodayFood, onDeleteTodayFood} = useFoodStorage();
  const handleButtonItemPress = async () => {
    try {
      if (isAbleToAdd) {
        await onSaveTodayFood({calories, name, portion});
        Alert.alert('The food was added to the day.');
      } else {
        await onDeleteTodayFood(itemPosition ?? -1);
        Alert.alert('The food was removed.');
      }
      onCompleteAddRemove?.();
    } catch (error) {
      Alert.alert('The food was not added due to an error.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftcontainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rightcontainer}>
        <View style={styles.iconbutton}>
          <Button
            icon={<Icon name={isAbleToAdd ? 'add-circle-outline' : 'close'} />}
            type="clear"
            onPress={handleButtonItemPress}
          />
        </View>
        <Text style={styles.calories}>{calories} cal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ADE8AF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
  },
  leftcontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  portion: {
    fontSize: 13,
    color: '#808080',
    fontWeight: '500',
  },
  calories: {
    fontSize: 18,
    fontWeight: '500',
  },
  iconbutton: {
    marginBottom: -8,
  },
});

export default MealItem;
