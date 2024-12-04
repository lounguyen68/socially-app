import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from './Avatar.component';
import { User } from '../api/login.api';
import { colors, ConversationType } from '../constants';
import Icon from './Icon';
import { useNavigation } from '@react-navigation/native';
import { apiGetConversationByUserId } from '../api/getConversationByUserId.api';
import { useDispatch } from 'react-redux';
import { setChatRoom } from '../redux/chatRoomSlice';

export type UserItemProps = {
  item: User;
};

export const UserItem = ({ item }: UserItemProps) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const navigateToConversationDetail = async () => {
    try {
      const data = await apiGetConversationByUserId({
        type: ConversationType.SINGLE,
        userId: item._id,
      });

      const params = {
        user: item,
        isMockConversation: !data,
      };

      const payload = {
        id: data?._id,
        conversation: data,
        messages: [],
      };

      dispatch(setChatRoom(payload));
      navigation.navigate('conversation-detail', params);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar src={item.avatarPath} containerStyle={styles.avatar} />
      <Text style={styles.name}>{item.name}</Text>
      <Icon
        name="send"
        size={24}
        onPress={navigateToConversationDetail}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.lightWhiteColor,
    marginVertical: 5,
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    textAlignVertical: 'center',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  icon: {
    padding: 8,
  },
});
