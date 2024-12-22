import {
  HomeStackScreen,
  MessageStackScreen,
  NotificationStackScreen,
  ProfileStackScreen,
} from '.';
import { CreatePostScreen } from '../screens';
import { SearchingStackScreen } from './searching.navigation';

export const mainStacks = [
  // {
  //   name: 'home-stack',
  //   title: '',
  //   icon: 'home',
  //   component: HomeStackScreen,
  // },
  {
    name: 'message-stack',
    title: '',
    icon: 'message',
    component: MessageStackScreen,
  },
  // {
  //   name: 'post',
  //   title: 'Post',
  //   icon: '',
  //   component: CreatePostScreen,
  // },
  {
    name: 'notification-stack',
    title: '',
    icon: 'search',
    component: SearchingStackScreen,
  },
  {
    name: 'profile-stack',
    title: '',
    icon: 'user',
    component: ProfileStackScreen,
  },
];
