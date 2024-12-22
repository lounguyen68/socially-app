import React, { useState, useEffect } from 'react';
import Input from './Input.component';
import { TextInputProps } from 'react-native';

interface DebouncedInputProps extends Omit<TextInputProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  debounce?: number;
}

export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: DebouncedInputProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(String(value));
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, onChange, debounce]);

  return (
    <Input
      {...props}
      value={String(value)}
      onChangeText={(text) => setValue(text)}
    />
  );
}
