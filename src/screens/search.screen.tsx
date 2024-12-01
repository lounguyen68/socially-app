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

const DEFAULT_LIMIT = 10;

export const SearchScreen = () => {
  const [searchStr, setSearchStr] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!searchStr) return;

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
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No users found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
    padding: 16,
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
