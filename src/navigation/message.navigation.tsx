import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { messageScreens } from '../constants';

const MessageStack = createStackNavigator();

export const MessageStackScreen: React.FC = () => (
  <MessageStack.Navigator>
    {messageScreens.map((screen) => (
      <MessageStack.Screen
        key={screen.name}
        name={screen.name}
        component={screen.component}
        options={{
          title: screen.title,
        }}
      />
    ))}
  </MessageStack.Navigator>
);
