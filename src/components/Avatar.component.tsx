import { Image } from 'expo-image';
import { StyleSheet, View, ViewStyle } from 'react-native';
interface AvatarProps {
  src?: string;
  containerStyle?: ViewStyle;
  setLoading?: () => void;
}

const DEFAULT_IMAGE =
  'https://scontent.fhan14-3.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=pq3BCajqsBEQ7kNvgF4vM4v&_nc_zt=24&_nc_ht=scontent.fhan14-3.fna&_nc_gid=AWnXu239rYwH3ceMxFA16-b&oh=00_AYDO7rEVPYgD6NnPjdGdhqAtCwN1HbyULVJVbJilYXDoqg&oe=677FC6FA';

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
