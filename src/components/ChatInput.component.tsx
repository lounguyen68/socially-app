import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constants';
import Input from './Input.component';

type ChatInputProps = {
  placeholder: string;
  style?: object;
  value?: string;
  setValue?: (valueStr: string) => void;
};

const ChatInput = ({ placeholder, style, setValue, value }: ChatInputProps) => {
  return (
    <View style={[styles.container, style]}>
      <Input
        style={styles.input}
        value={value ?? ''}
        onChangeText={(text) => setValue && setValue(text)}
        placeholder={placeholder}
        multiline={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 2,
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

export default ChatInput;
