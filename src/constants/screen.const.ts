import {
  CreatePostScreen,
  HomeScreen,
  MessageScreen,
  NotificationScreen,
  ProfileScreen,
} from '../screens';

export const mainScreens = [
  {
    name: 'home',
    title: '',
    icon: 'home',
    component: HomeScreen,
  },
  {
    name: 'message',
    title: '',
    icon: 'message',
    component: MessageScreen,
  },
  {
    name: 'post',
    title: '',
    icon: '',
    component: CreatePostScreen,
  },
  {
    name: 'notification',
    title: '',
    icon: 'heart',
    component: NotificationScreen,
  },
  {
    name: 'profile',
    title: '',
    icon: 'user',
    component: ProfileScreen,
  },
];

export type MainScreens = typeof mainScreens;
