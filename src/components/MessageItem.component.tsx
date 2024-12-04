import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Avatar } from '../components/Avatar.component';
import { colors, MessageType } from '../constants';
import { Message } from '../api/getMessages.api';
import { formatTime } from '../helpers';

const { width } = Dimensions.get('window');

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  if (message.type === MessageType.IMAGE)
    return (
      <Image
        source={{ uri: message.attachments?.[0].path }}
        style={styles.messageImage}
        resizeMode="cover"
      />
    );

  return (
    <View style={styles.container}>
      <Avatar
        src={message.sender.user.avatarPath}
        containerStyle={styles.avatar}
      />
      <Text style={styles.messageContent}>{message.content}</Text>

      <View style={styles.contentContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.messageTime}>
            {formatTime(message.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 1, // Allow content to shrink
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.lightWhiteColor,
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 30,
    height: 30,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  messageTime: {
    fontSize: 12,
    color: colors.grayColor,
    opacity: 0.5,
  },
  messageContent: {
    fontSize: 14,
    color: colors.blackColor,
    flexShrink: 1,
    maxWidth: width * 0.8,
  },
  messageImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
});
