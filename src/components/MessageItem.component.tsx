import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar } from '../components/Avatar.component';
import { colors } from '../constants';

interface IMessageItemProps {
  message: IMessage;
}

interface IMessage {
  user: {
    avatarUrl: string;
    name: string;
  };
  content: string;
  imageUrl?: string;
  time: string;
}

export default function MessageItem({ message }: IMessageItemProps) {
  return (
    <View style={styles.container}>
      <Avatar src={message.user.avatarUrl} />

      <View style={styles.contentContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{message.user.name}</Text>
          <Text style={styles.messageTime}>{message.time}</Text>
        </View>

        <Text style={styles.messageContent}>{message.content}</Text>

        {message.imageUrl && (
          <Image
            source={{ uri: message.imageUrl }}
            style={styles.messageImage}
            resizeMode="cover"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.whiteColor,
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    gap: 16,
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
  userName: {
    fontSize: 16,
    color: colors.primaryColor,
    opacity: 0.8,
  },
  messageTime: {
    fontSize: 12,
    color: colors.grayColor,
    opacity: 0.5,
  },
  messageContent: {
    fontSize: 14,
    color: colors.secondaryColor,
    opacity: 0.8,
  },
  messageImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
});
