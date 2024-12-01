import { StyleSheet, Text, View } from 'react-native';
import SearchInput from '../components/SearchInput.component';
import { useState } from 'react';
import { colors } from '../constants';
export const SearchScreen = () => {
  const [searchStr, setSearchStr] = useState<string>('');
  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Search for users"
        search={searchStr}
        setSearch={setSearchStr}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
});
