import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { notificationScreens } from '../constants';

const NotificationStack = createStackNavigator();

export const NotificationStackScreen: React.FC = () => (
  <NotificationStack.Navigator>
    {notificationScreens.map((screen) => (
      <NotificationStack.Screen
        key={screen.name}
        name={screen.name}
        component={screen.component}
        options={{
          title: screen.title,
        }}
      />
    ))}
  </NotificationStack.Navigator>
);
