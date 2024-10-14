import { Icons } from '@/src/constants/icons.const';
import { defaultStyles } from '@/src/constants/styles.const';
import * as React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';

const fillColors = ['vovgzzvcjl', 'gkabhzywwl'];

interface IconProps {
  name: string;
  colors?: string[];
  size?: number;
  style?: ViewStyle;
  onPress?: () => void;
}

const Icon = ({ name, colors, size, style, onPress }: IconProps) => {
  let iconUri = Icons[name];

  if (!iconUri) return <></>;

  if (colors && colors.length) {
    fillColors.forEach(
      (color, index) => (iconUri = iconUri.replace(color, colors[index])),
    );
  }

  if (!onPress)
    return (
      <View style={[defaultStyles.iconContainer, style]}>
        <Text>
          <SvgXml width={size ?? 16} height={size ?? 16} xml={iconUri} />
        </Text>
      </View>
    );

  return (
    <TouchableOpacity
      style={[defaultStyles.iconContainer, style]}
      onPress={onPress}
    >
      <Text>
        <SvgXml width={size ?? 16} height={size ?? 16} xml={iconUri} />;
      </Text>
    </TouchableOpacity>
  );
};

export default Icon;
