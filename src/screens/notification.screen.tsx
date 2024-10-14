import { StyleSheet, Text } from 'react-native';
import ScreenComponent from '../components/Screen.component';

export const NotificationScreen = () => {
  return (
    <ScreenComponent
      title="Home"
      headerLeft={<></>}
      // headerRight={<Button title="retry" onPress={handleRefresh} />}
    >
      <Text>{'Home '}</Text>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({});
