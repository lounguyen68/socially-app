export enum Routes {
  SIGNUP = '/auth/register',
  LOGIN = '/auth/login',
  LOGOUT = '/auth/logout',
  REFRESH_TOKEN = '/auth/token',
  GET_USERS = '/users',
  UPDATE_USER_AVATAR = '/users/update-avatar',
  GET_CONVERSATIONS = '/conversations',
  CREATE_CONVERSATION = '/conversations',
  GET_CONVERSATION_BY_ID = '/conversations',
  GET_CONVERSATION_BY_USER_ID = '/conversations/single',
  GET_MESSAGES = '/messages',
  CREATE_MESSAGE = '/messages',

  SIGNED_URL = '/files/signed-url',
}
