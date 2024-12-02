import type { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  home: undefined;
  profile: { userId: string };
  message: undefined;
  'conversation-detail': {
    conversationId?: string;
    conversationName: string;
    conversationAvatar: string;
    isMockConversation: boolean;
  };
  'conversation-item': undefined;
  notification: undefined;
  login: undefined;
  register: undefined;
  search: undefined;
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

export type SearchScreenProps = StackScreenProps<RootStackParamList, 'search'>;

export type ConversationDetailProps = StackScreenProps<
  RootStackParamList,
  'conversation-detail'
>;

export type ConversationItemProps = StackScreenProps<
  RootStackParamList,
  'conversation-item'
>;
