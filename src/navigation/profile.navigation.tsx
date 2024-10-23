import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { profileScreens } from '../constants';

const ProfileStack = createStackNavigator();

export const ProfileStackScreen: React.FC = () => (
  <ProfileStack.Navigator>
    {profileScreens.map((screen) => (
      <ProfileStack.Screen
        key={screen.name}
        name={screen.name}
        component={screen.component}
        options={{
          title: screen.title,
        }}
      />
    ))}
  </ProfileStack.Navigator>
);
