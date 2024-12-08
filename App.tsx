import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import TabsComponent from './src/components/Tabs.component';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store';
import {
  PopupProvider,
  ServiceProvider,
  SocketProvider,
  useServices,
} from './src/context';
import { RootState } from './src/redux/store';
import { AuthStackScreen } from './src/navigation';

SplashScreen.preventAutoHideAsync();

const MainNavigator = () => {
  const { userService } = useServices();
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?._id) {
      userService.checkRememberLogin(dispatch);
    }
  }, [user?._id]);

  if (!user) {
    return <AuthStackScreen />;
  }

  return (
    <SocketProvider>
      <TabsComponent />
    </SocketProvider>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // SplashScreen.hideAsync();
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
