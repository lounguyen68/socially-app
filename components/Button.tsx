import { ThemedText } from './ThemedText';
import Icon from './Icon';
import { defaultStyles } from '@/constants/Styles';
import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface ButtonProps {
  title?: string;
  icon?: string;
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
  containerStyle,
  textStyle,
  iconStyle,
  iconSize,
  iconColors,
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[defaultStyles.buttonContainer, containerStyle]}
      onPress={onPress}
    >
      {title && <ThemedText style={textStyle}>{title}</ThemedText>}
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
