import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Conversation } from '../api/getConversations.api';
import { useConversation } from '../hooks/useConversation.hook';
import { Avatar } from './Avatar.component';
import { formatTime } from '../helpers';

export const ConversationItem = ({ item }: { item: Conversation }) => {
  const { getConversationInfo } = useConversation(item);

  const [conversationName, conversationAvatar] = getConversationInfo();

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.info}>
        <Avatar src={conversationAvatar} containerStyle={styles.avatar} />
        <Text style={styles.name}>{conversationName}</Text>
      </View>
      {item.updatedAt && (
        <Text style={styles.name}>{formatTime(item.updatedAt)}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 2,
    padding: 8,
    flex: 1,
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 8,
    width: 60,
    height: 60,
  },
  name: {
    fontSize: 16,
  },
});
