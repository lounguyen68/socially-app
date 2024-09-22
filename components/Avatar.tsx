import { StyleSheet, ViewStyle } from 'react-native';
import { ThemedView } from './ThemedView';
import { Image } from 'expo-image';

interface AvatarProps {
  src?: string;
  containerStyle?: ViewStyle;
}

export const Avatar = ({ src, containerStyle }: AvatarProps) => {
  const source = src ?? 'https://picsum.photos/seed/696/3000/2000';

  return (
    <ThemedView style={[styles.container, containerStyle]}>
      <Image
        style={styles.image}
        source={source}
        contentFit="cover"
        transition={1000}
      />
    </ThemedView>
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
