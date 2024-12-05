import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
interface AvatarProps {
  src?: string;
  containerStyle?: ViewStyle;
}

const DEFAULT_IMAGE = 'https://picsum.photos/seed/696/3000/2000';

export const Avatar = ({ src, containerStyle }: AvatarProps) => {
  const [source, setSource] = useState(src ?? DEFAULT_IMAGE);

  useEffect(() => {
    setSource(src ?? DEFAULT_IMAGE);
  }, [src]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        style={styles.image}
        source={{
          uri: source,
        }}
        onError={() => setSource(DEFAULT_IMAGE)}
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
