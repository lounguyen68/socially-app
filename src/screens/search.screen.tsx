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

  useEffect(() => {
    if (!searchStr) return setUsers([]);

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await apiGetUsers({
          limit: DEFAULT_LIMIT,
          skip: 0,
          keyword: searchStr,
        });
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchStr]);

  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Search for users"
        search={searchStr}
        setSearch={setSearchStr}
      />
      {loading && (
        <ActivityIndicator
          size="large"
          color={colors.primaryColor}
          style={styles.loader}
        />
      )}
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <UserItem item={item} />}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center' }}>No users found</Text>
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
  loader: {
    marginTop: 20,
  },
  userItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayColor,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primaryColor,
  },
  userEmail: {
    fontSize: 14,
    color: colors.secondaryColor,
  },
});
