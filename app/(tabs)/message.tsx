import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MessageScreen() {
  return (
    <SafeAreaView>
      <ThemedText type="title">{'Message Screen'}</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
