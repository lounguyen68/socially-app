import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import Icon from './Icon';

interface TabBarIconProps {
  name: string;
  color: string;
  size?: number;
  style?: ViewStyle;
}

const TabBarIcon = ({ name, color, size = 28, style }: TabBarIconProps) => {
  return (
    <View style={style}>
      <Icon name={name} colors={[color]} size={size} />
    </View>
  );
};

export default TabBarIcon;
