import { Tabs, useRouter } from 'expo-router';
import React from 'react';

import Icon from '@/components/Icon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet } from 'react-native';
import { mainScreens } from '@/constants/Screens';
import { Button } from '@/components/Button';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
          tabBarInactiveTintColor:
            Colors[colorScheme ?? 'light'].tabIconDefault,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderTopWidth: colorScheme === 'light' ? 0 : 2,
            borderRightWidth: colorScheme === 'light' ? 0 : 2,
            borderLeftWidth: colorScheme === 'light' ? 0 : 2,
            elevation: 4,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            height: 60,
            alignItems: 'center',
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      >
        {mainScreens.map((screen, index) => (
          <Tabs.Screen
            key={`${screen.name}_${index}`}
            name={screen.name}
            options={{
              title: `${screen.title}`,
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  name={screen.icon}
                  size={28}
                  colors={[color]}
                  style={styles.tabBarIcon}
                />
              ),
            }}
          />
        ))}
      </Tabs>
      <Button
        onPress={() => router.push('/post')}
        icon="circle-x"
        iconSize={28}
        containerStyle={{
          ...styles.button,
          backgroundColor: Colors[colorScheme ?? 'light'].text,
        }}
        iconColors={[Colors[colorScheme ?? 'light'].background]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    padding: 8,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 180,
    width: 60,
    height: 60,
    borderRadius: 22,
    transform: [{ rotate: '45deg' }],

    shadowColor: '#000000', // Color of the shadow
    shadowOffset: { width: 0, height: 4 }, // Horizontal and vertical offsets
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 12, // Blur radius
    elevation: 12, // Elevation for Android (matching the blur radius)
  },
});
