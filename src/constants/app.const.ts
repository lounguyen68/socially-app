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

export enum ClientEmitMessages {
  SEND_MESSAGE = 'SEND_MESSAGE',
  CREATE_CONVERSATION = 'CREATE_CONVERSATION',
}

export enum ServerEmitMessages {
  NEW_MESSAGE = 'NEW_MESSAGE',
  NEW_CONVERSATION = 'NEW_CONVERSATION',
}
