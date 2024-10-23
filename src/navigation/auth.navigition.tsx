import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { authScreens } from '../constants/screen.const';

const AuthStack = createStackNavigator();

export const AuthStackScreen: React.FC = () => (
  <AuthStack.Navigator initialRouteName="login">
    {authScreens.map((screen) => (
      <AuthStack.Screen
        key={screen.name}
        name={screen.name}
        component={screen.component}
        options={{ headerShown: false }}
      />
    ))}
  </AuthStack.Navigator>
);
