import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from '../components/Avatar.component';
import { colors, MessageType } from '../constants';
import { Message } from '../api/getMessages.api';
import { formatTime } from '../helpers';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import MessageImages from './MessageImages.component';
import { MessageDocuments } from './MessageDocuments';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const { user } = useSelector((state: RootState) => state.user);

  const isYourMessage = user?._id === message.sender.user._id;

  const renderMessageContent = () => {
    if (message.type === MessageType.IMAGE) {
      if (!message.attachments?.length) return <></>;

      return (
        <MessageImages
          attachments={message.attachments}
          isYourMessage={isYourMessage}
        />
      );
    }

    if (message.type === MessageType.FILE) {
      if (!message.attachments?.length) return <></>;

      return (
        <MessageDocuments
          documents={message.attachments}
          isYourMessage={isYourMessage}
        />
      );
    }

    return (
      <View
        style={[
          styles.bubble,
          isYourMessage ? styles.userBubble : styles.receivedBubble,
        ]}
      >
        <Text
          style={
            isYourMessage
              ? styles.messageContent
              : styles.receivedMessageContent
          }
        >
          {message.content}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        isYourMessage ? styles.userMessage : styles.receivedMessage,
      ]}
    >
      {!isYourMessage && (
        <Avatar
          src={message.sender.user.avatarPath}
          containerStyle={styles.avatar}
        />
      )}
      {renderMessageContent()}
      <Text style={styles.messageTime}>{formatTime(message.createdAt)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
    maxWidth: '80%', // Giới hạn chiều rộng của message
  },
  userMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  bubble: {
    borderRadius: 20,
    padding: 10,
    flexShrink: 1,
  },
  userBubble: {
    backgroundColor: colors.primaryColor,
    alignSelf: 'flex-end',
  },
  receivedBubble: {
    backgroundColor: colors.lightWhiteColor,
    alignSelf: 'flex-start',
  },
  messageContent: {
    fontSize: 14,
    color: colors.whiteColor,
  },
  receivedMessageContent: {
    fontSize: 14,
    color: colors.blackColor,
  },
  messageTime: {
    fontSize: 10,
    color: colors.grayColor,
    opacity: 0.7,
    margin: 2,
    textAlign: 'right',
  },
});
