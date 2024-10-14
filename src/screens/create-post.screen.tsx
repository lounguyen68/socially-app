import { StyleSheet, Text } from 'react-native';
import ScreenComponent from '../components/Screen.component';

export const CreatePostScreen = () => {
  return (
    <ScreenComponent
      title="CreatePostScreen"
      headerLeft={<></>}
      // headerRight={<Button title="retry" onPress={handleRefresh} />}
    >
      <Text>{'CreatePostScreen '}</Text>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({});
