import { Conversation } from '../api/getConversations.api';
import { Message } from '../api/getMessages.api';
import { MessageType } from '../constants';
import { decryptMessage } from './crypto.helper';

export const messageV2 = async (message: Message, sharedKey: string) => {
  if (!message.isEncrypted) return message;

  try {
    if ([MessageType.IMAGE, MessageType.FILE].includes(message.type)) {
      const decryptedAttachments = await Promise.all(
        message.attachments?.map(async (attachment) => {
          const decryptedPath = await decryptMessage(
            attachment.path,
            sharedKey,
          );
          return {
            ...attachment,
            path: decryptedPath ?? attachment.path,
          };
        }) ?? [],
      );

      return {
        ...message,
        attachments: decryptedAttachments,
      };
    }

    const decryptedContent = await decryptMessage(
      message?.content ?? '',
      sharedKey,
    );

    return {
      ...message,
      content: decryptedContent ?? message.content,
    };
  } catch (error) {
    console.error('Failed to decrypt message:', error);
    return message;
  }
};

export const decryptMessages = async (
  messages: Message[],
  conversation?: Conversation,
) => {
  const sharedKey = conversation?.sharedKey;

  if (!sharedKey) return messages;

  return await Promise.all(
    messages.map(async (message) => await messageV2(message, sharedKey)),
  );
};
