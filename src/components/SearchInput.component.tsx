import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from './Icon';
import DebouncedInput from './DebounceInput.compoment';
import { colors } from '../constants';

type SearchInputProps = {
  placeholder: string;
  style?: object;
  search?: string;
  setSearch?: (searchStr: string) => void;
};

const SearchInput = ({
  placeholder,
  style,
  setSearch,
  search,
}: SearchInputProps) => {
  return (
    <View style={[styles.container, style]}>
      <Icon name="search" colors={[colors.blackColor]} />
      <DebouncedInput
        style={styles.input}
        value={search ?? ''}
        onChange={(value: string) => setSearch && setSearch(value)}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    backgroundColor: colors.lightWhiteColor,
    shadowColor: colors.blackColor,
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  iconButton: {
    padding: 8,
    borderRadius: 50,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
});

export default SearchInput;
