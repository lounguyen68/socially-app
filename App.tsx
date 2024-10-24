import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import TabsComponent from './src/components/Tabs.component';
import { Provider, useSelector } from 'react-redux';
import store from './src/redux/store';
import { PopupProvider, ServiceProvider } from './src/context';
import { RootState } from './src/redux/store';
import { AuthStackScreen } from './src/navigation';

SplashScreen.preventAutoHideAsync();

const MainNavigator = () => {
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  if (!user) {
    return <AuthStackScreen />;
  }

  return <TabsComponent />;
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Provider store={store}>
        <ServiceProvider>
          <PopupProvider>
            <MainNavigator />
            <StatusBar style="auto" />
          </PopupProvider>
        </ServiceProvider>
      </Provider>
    </NavigationContainer>
  );
}
