import { StyleSheet, Text, View } from 'react-native';
import { usePopup } from '../context/Popup.context';
import { Button } from '../components/Button.component';

export function MessageScreen() {
  console.log('MessageScreen');

  const { showPopup } = usePopup();
  return (
    <View style={styles.container}>
      <Button
        title="Show Error"
        onPress={() => showPopup('Đã có lỗi xảy ra!')}
      />
      <Button
        title="Show Confirm"
        onPress={() =>
          showPopup('Bạn có chắc chắn không?', () => console.log('OK pressed'))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
