import { Image } from 'expo-image';
import { StyleSheet, View, ViewStyle } from 'react-native';
interface AvatarProps {
  src?: string;
  containerStyle?: ViewStyle;
  setLoading?: () => void;
}

const DEFAULT_IMAGE = 'https://picsum.photos/seed/696/3000/2000';

export const Avatar = ({ src, containerStyle, setLoading }: AvatarProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        style={styles.image}
        source={{
          uri: src,
        }}
        onLoadEnd={() => setLoading && setLoading()}
        placeholder={DEFAULT_IMAGE}
        placeholderContentFit="fill"
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
