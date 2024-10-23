import { StyleSheet, Text, View } from 'react-native';
import ScreenComponent from '../components/Screen.component';
import { usePopup } from '../components/Popup.component';
import { Button } from '../components/Button.component';

export const MessageScreen = () => {
  const { showPopup } = usePopup();
  return (
    <ScreenComponent title="Message" headerLeft={<></>}>
      <View style={styles.container}>
        <Button
          title="Show Error"
          onPress={() => showPopup('Đã có lỗi xảy ra!')}
        />
        <Button
          title="Show Confirm"
          onPress={() =>
            showPopup('Bạn có chắc chắn không?', () =>
              console.log('OK pressed'),
            )
          }
        />
      </View>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
