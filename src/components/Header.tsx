import { Button } from './Button.component';
import { StyleSheet, Text, View } from 'react-native';
import Icon from './Icon';

interface HeaderProps {
  title: string;
  headerLeft?: () => React.JSX.Element;
  headerRight?: () => React.JSX.Element;
}

const HeaderLeft = () => {
  return (
    <View style={styles.headerLeft}>
      <Button
        // onPress={() => router.back()}
        icon="chevron-left"
        iconSize={32}
        // iconColors={[colorTheme.text]}
        // containerStyle={{
        //   backgroundColor: colorTheme.background,
        // }}
      />
    </View>
  );
};

const HeaderRight = () => {
  return (
    <View style={styles.headerRight}>
      <Button
        icon="chevron-left"
        // iconColors={[colorTheme.background]}
        // containerStyle={{
        //   backgroundColor: colorTheme.background,
        // }}
      />
    </View>
  );
};

export const Header = ({
  title,
  headerLeft = HeaderLeft,
  headerRight = HeaderRight,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      {headerLeft()}
      <Text>{title}</Text>
      {headerRight()}
    </View>
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
