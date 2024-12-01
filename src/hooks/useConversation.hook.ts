import { useSelector } from 'react-redux';
import { Conversation } from '../api/getConversations.api';
import { ConversationType } from '../constants';
import { RootState } from '../redux/store';

export const useConversation = (conversation: Conversation) => {
  const { user } = useSelector((state: RootState) => state.user);
  const getConversationInfo = () => {
    if (conversation.type === ConversationType.SINGLE) {
      const receiverMember = conversation.members.find(
        (member) => member.user._id !== user?._id,
      );

      return [receiverMember?.user.name, receiverMember?.user.avatarPath];
    }

    return [];
  };

  return { getConversationInfo };
};
