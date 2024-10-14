import { Image } from 'expo-image';
import { StyleSheet, View, ViewStyle } from 'react-native';
interface AvatarProps {
  src?: string;
  containerStyle?: ViewStyle;
}

export const Avatar = ({ src, containerStyle }: AvatarProps) => {
  const source = src ?? 'https://picsum.photos/seed/696/3000/2000';

  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        style={styles.image}
        source={{
          uri: source,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
});
