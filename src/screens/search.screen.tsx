import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SearchInput from '../components/SearchInput.component';
import { useState, useEffect } from 'react';
import { colors } from '../constants';
import { apiGetUsers } from '../api/getUsers.api';
import { UserItem } from '../components/UserItem.component';
import { SearchScreenProps } from '@/type';

const DEFAULT_LIMIT = 10;

export const SearchScreen = ({ navigation }: SearchScreenProps) => {
  const [searchStr, setSearchStr] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [skip, setSkip] = useState<number>(0);

  const fetchUsers = async (isLoadMore = false) => {
    if ((isLoadMore && !hasMore) || (isLoadMore && loadingMore)) return;

    if (!isLoadMore) {
      setLoading(true);
      setSkip(0); // Reset skip khi tìm kiếm mới
    } else {
      setLoadingMore(true);
    }

    try {
      const data = await apiGetUsers({
        limit: DEFAULT_LIMIT,
        skip: isLoadMore ? skip : 0,
        keyword: searchStr,
      });

      if (isLoadMore) {
        setUsers((prev) => [...prev, ...data]);
      } else {
        setUsers(data);
      }

      setHasMore(data.length === DEFAULT_LIMIT); // Kiểm tra nếu còn dữ liệu
      setSkip((prev) => prev + data.length); // Cập nhật skip
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      if (isLoadMore) setLoadingMore(false);
      else setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchStr) {
      setUsers([]);
      setHasMore(true); // Reset trạng thái khi xóa từ khóa
      return;
    }

    fetchUsers();
  }, [searchStr]);

  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Search for users"
        search={searchStr}
        setSearch={setSearchStr}
      />
      {loading && !loadingMore && (
        <ActivityIndicator
          size="large"
          color={colors.primaryColor}
          style={styles.loader}
        />
      )}
      <FlatList
        style={styles.list}
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <UserItem item={item} />}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center' }}>No users found</Text>
        }
        onEndReached={() => fetchUsers(true)}
        onEndReachedThreshold={1}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" color={colors.primaryColor} />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  list: {
    margin: 4,
  },
  loader: {
    marginTop: 20,
  },
});
