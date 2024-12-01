import { FlatList, StyleSheet } from 'react-native';
import { usePopup } from '../context/Popup.context';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { apiGetConversations, Conversation } from '../api/getConversations.api';
import { setConversations } from '../redux/conversationsSlice';
import { ConversationItem } from '../components/ConversationItem.component';
import { colors } from '../constants';

const DEFAULT_LIMIT = 10;

export function MessageScreen() {
  const [hasMoreConversations, setHasMoreConversations] = useState(true);
  const { conversations } = useSelector(
    (state: RootState) => state.conversations,
  );
  const dispatch = useDispatch();
  const { showPopup } = usePopup();

  const fetchConversations = async (isRefreshing?: boolean) => {
    if (!hasMoreConversations) return;

    try {
      const data = await apiGetConversations({
        limit: DEFAULT_LIMIT,
        skip: conversations.length,
      });

      dispatch(
        setConversations({
          conversations: data,
          isRefreshing: !!isRefreshing,
        }),
      );

      if (data.length < DEFAULT_LIMIT) {
        setHasMoreConversations(false);
      }
    } catch (error) {
      showPopup('Failed to load conversations.');
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Conversation }) => <ConversationItem item={item} />,
    [],
  );

  return (
    <FlatList
      style={styles.container}
      data={conversations}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      onEndReached={() => fetchConversations()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
});
