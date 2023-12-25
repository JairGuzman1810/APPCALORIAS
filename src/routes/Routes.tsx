import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamsList} from '../types';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import AddFood from '../views/AddFood';

const Stack = createStackNavigator<RootStackParamsList>();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddFood">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddFood"
          component={AddFood}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
