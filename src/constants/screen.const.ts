import {
  HomeScreen,
  MessageScreen,
  NotificationScreen,
  ProfileScreen,
} from '../screens';
import LoginScreen from '../screens/login.screen';
import RegisterScreen from '../screens/register.screen';

export const authScreens = [
  {
    name: 'login',
    title: 'Login',
    component: LoginScreen,
  },
  {
    name: 'register',
    title: 'Register',
    component: RegisterScreen,
  },
];

export const homeScreens = [
  {
    name: 'home',
    title: 'Home',
    component: HomeScreen,
  },
];

export const messageScreens = [
  {
    name: 'message',
    title: 'Message',
    component: MessageScreen,
  },
];

export const notificationScreens = [
  {
    name: 'notification',
    title: 'Notification',
    component: NotificationScreen,
  },
];

export const profileScreens = [
  {
    name: 'profile',
    title: 'Profile',
    component: ProfileScreen,
  },
];

export const screens = [
  ...authScreens,
  ...homeScreens,
  ...messageScreens,
  ...profileScreens,
];
