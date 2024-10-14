import { StyleSheet, Text } from 'react-native';
import ScreenComponent from '../components/Screen.component';

export const MessageScreen = () => {
  return (
    <ScreenComponent
      title="Message"
      headerLeft={<></>}
      // headerRight={<Button title="retry" onPress={handleRefresh} />}
    >
      <Text>{'Message '}</Text>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({});
