import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Conversation } from '../api/getConversations.api';
import { useConversation } from '../hooks/useConversation.hook';
import { Avatar } from './Avatar.component';
import { formatTime } from '../helpers';
import { colors, MessageType } from '../constants';
import Svg, { Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setChatRoom } from '../redux/chatRoomSlice';
import { useMemo } from 'react';

export type ConversationItemProps = {
  item: Conversation;
  isReaded: boolean;
};

export const ConversationItem = ({ item, isReaded }: ConversationItemProps) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const { getConversationInfo } = useConversation(item);

  const [conversationName, conversationAvatar] = getConversationInfo();

  const navigateToConversationDetail = () => {
    dispatch(
      setChatRoom({
        _id: item._id,
        conversation: item,
        messages: [],
      }),
    );

    navigation.navigate('conversation-detail', {
      conversationName: conversationName,
      conversationAvatar: conversationAvatar,
    });
  };

  const lastMessageContent = useMemo(() => {
    const { lastMessage } = item;

    if (!lastMessage) return '';

    if (lastMessage.type === MessageType.TEXT) return lastMessage.content;
  }, [item.lastMessage]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={navigateToConversationDetail}
    >
      {!isReaded && (
        <Svg width="24" height="24" style={styles.unreadIndicator}>
          <Circle cx="12" cy="12" r="6" fill={colors.primaryColor} />
        </Svg>
      )}
      <Avatar src={conversationAvatar} containerStyle={styles.avatar} />
      <View style={styles.content}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{conversationName}</Text>
          {item.updatedAt && (
            <Text style={styles.timestamp}>{formatTime(item.updatedAt)}</Text>
          )}
        </View>
        <Text style={styles.message} numberOfLines={1}>
          {lastMessageContent}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 4,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    marginVertical: 5,
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    color: colors.grayColor,
  },
  message: {
    fontSize: 14,
    color: colors.grayColor,
    opacity: 0.8,
  },
  unreadIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
});
