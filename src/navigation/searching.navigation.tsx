import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { searchingScreens } from '../constants';

const SearchingStack = createStackNavigator();

export const SearchingStackScreen: React.FC = () => (
  <SearchingStack.Navigator>
    {searchingScreens.map((screen) => (
      <SearchingStack.Screen
        key={screen.name}
        name={screen.name}
        component={screen.component}
        options={{
          title: screen.title,
        }}
      />
    ))}
  </SearchingStack.Navigator>
);
