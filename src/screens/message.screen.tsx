import { FlatList, StyleSheet, View, Text } from 'react-native';
import { usePopup } from '../context/Popup.context';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { apiGetConversations, Conversation } from '../api/getConversations.api';
import { setConversations } from '../redux/conversationsSlice';
import { ConversationItem } from '../components/ConversationItem.component';
import { colors } from '../constants';
import SearchInput from '../components/SearchInput.component';
import { RefreshControl } from 'react-native-gesture-handler';

const DEFAULT_LIMIT = 10;

export function MessageScreen({ navigation }: any) {
  const [hasMoreConversations, setHasMoreConversations] = useState(true);
  const [keyword, setKeyword] = useState('');
  const { conversations } = useSelector(
    (state: RootState) => state.conversations,
  );
  const dispatch = useDispatch();
  const { showPopup } = usePopup();

  const fetchConversations = async (
    isRefreshing?: boolean,
    newKeyword?: string,
  ) => {
    if (!hasMoreConversations && !isRefreshing && !newKeyword) return;

    try {
      const data = await apiGetConversations({
        limit: DEFAULT_LIMIT,
        skip: isRefreshing ? 0 : conversations.length,
        keyword: newKeyword ?? keyword,
      });

      dispatch(
        setConversations({
          conversations: data,
          isRefreshing: !!isRefreshing,
        }),
      );

      if (data.length < DEFAULT_LIMIT) {
        setHasMoreConversations(false);
      } else {
        setHasMoreConversations(true);
      }
    } catch (error) {
      showPopup('Failed to load conversations.');
    }
  };

  const loadMoreConversations = () => {
    if (!keyword && !conversations.length) return;

    if (!hasMoreConversations) return;
    fetchConversations();
  };

  const refreshConversations = () => {
    setHasMoreConversations(true);
    fetchConversations(true, keyword);
  };

  useEffect(() => {
    fetchConversations(true, keyword);
  }, [keyword]);

  const renderItem = useCallback(
    ({ item }: { item: Conversation }) => (
      <ConversationItem item={item} isReaded={false} />
    ),
    [conversations],
  );

  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Search for conversations"
        search={keyword}
        setSearch={setKeyword}
      />
      <FlatList
        style={styles.list}
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        onEndReached={loadMoreConversations}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refreshConversations} />
        }
        ListEmptyComponent={
          <View>
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              No conversations found
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  list: {
    margin: 4,
  },
});
