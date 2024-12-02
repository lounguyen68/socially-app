import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { mainStacks } from '../navigation/stack.navigation';
import TabBarIcon from './TabBarIcon.component';
import { StyleSheet } from 'react-native';
import { Button } from './Button.component';
import { colors } from '../constants/colors.const';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabsComponent: React.FC = () => {
  const navigation = useNavigation<NavigationProp<Record<string, any>>>();

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        elevation: 4,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        height: 60,
      }}
      initialRouteName="home"
    >
      {mainStacks.map((screen, index) => (
        <Tab.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{
            headerShown: screen.name === 'post',
            headerTitle: screen.title,
            tabBarIcon: ({ color }) => {
              if (screen.name === 'post')
                return (
                  <Button
                    onPress={() => navigation.navigate(screen.name)}
                    icon="circle-x"
                    iconSize={28}
                    containerStyle={{
                      ...styles.button,
                      backgroundColor: colors.blackColor,
                    }}
                    iconColors={[colors.whiteColor]}
                  />
                );

              return (
                <TabBarIcon
                  name={screen.icon}
                  color={color}
                  style={styles.tabBarIcon}
                />
              );
            },
            tabBarHideOnKeyboard: true,
            tabBarLabelStyle: { display: 'none' },
            tabBarActiveTintColor: colors.primaryColor,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarIcon: {
    padding: 8,
  },
  button: {
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 22,
    transform: [{ rotate: '45deg' }],

    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
  },
});

export default TabsComponent;
