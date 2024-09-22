import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Button } from './Button';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { Colors } from '@/constants/Colors';
import Icon from './Icon';

interface HeaderProps {
  title: string;
  headerLeft?: () => React.JSX.Element;
  headerRight?: () => React.JSX.Element;
}

const HeaderLeft = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colorTheme = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.headerLeft}>
      <Button
        onPress={() => router.back()}
        icon="chevron-left"
        iconSize={32}
        iconColors={[colorTheme.text]}
        containerStyle={{
          backgroundColor: colorTheme.background,
        }}
      />
    </ThemedView>
  );
};

const HeaderRight = () => {
  const colorScheme = useColorScheme();
  const colorTheme = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.headerRight}>
      <Button
        icon="chevron-left"
        iconColors={[colorTheme.background]}
        containerStyle={{
          backgroundColor: colorTheme.background,
        }}
      />
    </ThemedView>
  );
};

export const Header = ({
  title,
  headerLeft = HeaderLeft,
  headerRight = HeaderRight,
}: HeaderProps) => {
  return (
    <ThemedView style={styles.container}>
      {headerLeft()}
      <ThemedText type="title">{title}</ThemedText>
      {headerRight()}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  headerLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  headerRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});
