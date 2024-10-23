import type { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  home: undefined; // HomeScreen doesn't need any params
  profile: { userId: string }; // ProfileScreen requires a userId
  message: undefined; // MessageScreen doesn't need any params
  notification: undefined; // NotificationScreen doesn't need any params
  login: undefined; // LoginScreen doesn't need any params
  register: undefined; // RegisterScreen might need a userId
};

// Use StackScreenProps for type-safe navigation between screens
export type ProfileScreenProps = StackScreenProps<
  RootStackParamList,
  'profile'
>;
export type RegisterScreenProps = StackScreenProps<
  RootStackParamList,
  'register'
>;
export type LoginScreenProps = StackScreenProps<RootStackParamList, 'login'>;
