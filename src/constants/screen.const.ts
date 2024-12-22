import {
  ConversationDetail,
  HomeScreen,
  MessageScreen,
  ProfileScreen,
  SearchScreen,
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
  {
    name: 'conversation-detail',
    title: 'Message Detai;',
    component: ConversationDetail,
  },
];

// export const notificationScreens = [
//   {
//     name: 'notification',
//     title: 'Notification',
//     component: NotificationScreen,
//   },
// ];

export const searchingScreens = [
  {
    name: 'search',
    title: 'Search',
    component: SearchScreen,
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
