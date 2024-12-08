export enum ConversationType {
  SINGLE,
  GROUP,
}

export enum MessageType {
  TEXT,
  IMAGE,
  FILE,
  VIDEO,
  REACT,
}

export enum UploadType {
  AVATAR = 'avatar',
  CHAT = 'chat',
}

export enum ClientEmitMessages {
  SEND_MESSAGE = 'SEND_MESSAGE',
  CREATE_CONVERSATION = 'CREATE_CONVERSATION',
  JOIN_CONVERSATION = 'JOIN_CONVERSATION',
  OUT_CONVERSATION = 'OUT_CONVERSATION',
}

export enum ServerEmitMessages {
  NEW_MESSAGE = 'NEW_MESSAGE',
  NEW_CONVERSATION = 'NEW_CONVERSATION',
  JOIN_CONVERSATION = 'JOIN_CONVERSATION',
  OUT_CONVERSATION = 'OUT_CONVERSATION',
}

export const LOGO_APP =
  'https://socially-s3.s3.ap-southeast-1.amazonaws.com/avatar/socially-icon.png';
