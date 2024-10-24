import Icon from './Icon';
import { defaultStyles } from '@/src/constants/styles.const';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface ButtonProps {
  title?: string;
  icon?: string;
  activeOpacity?: number;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: ViewStyle;
  iconSize?: number;
  iconColors?: string[];
  onPress?: () => void;
}

export const Button = ({
  title,
  icon,
  activeOpacity = 0.8,
  containerStyle,
  textStyle,
  iconStyle,
  iconSize = 22,
  iconColors,
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={[defaultStyles.buttonContainer, containerStyle]}
      onPress={onPress}
    >
      {title && <Text style={textStyle}>{title}</Text>}
      {icon && (
        <Icon
          name={icon}
          size={iconSize}
          style={iconStyle}
          colors={iconColors}
        />
      )}
    </TouchableOpacity>
  );
};
