import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { homeScreens } from '../constants';
import { HomeScreen } from '../screens';

const HomeStack = createStackNavigator();

export const HomeStackScreen: React.FC = () => (
  <HomeStack.Navigator>
    {homeScreens.map((screen) => (
      <HomeStack.Screen
        key={screen.name}
        name={screen.name}
        component={screen.component}
        options={{
          title: screen.title,
        }}
      />
    ))}
  </HomeStack.Navigator>
);
