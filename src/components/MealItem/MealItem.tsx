import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Meal} from '../../types';
import {Button} from '@rneui/themed';
import {Icon} from '@rneui/base';

const MealItem: FC<Meal> = ({calories, name, portion}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftcontainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rightcontainer}>
        <View style={styles.iconbutton}>
          <Button icon={<Icon name="add-circle-outline" />} type="clear" />
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
