import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

export type InputProps = TextInputProps;

const Input = React.forwardRef<TextInput, InputProps>(
  ({ style, ...props }, ref) => {
    return <TextInput ref={ref} style={[styles.input, style]} {...props} />;
  },
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    fontSize: 14,
    lineHeight: 20,
  },
});

Input.displayName = 'Input';

export default Input;
