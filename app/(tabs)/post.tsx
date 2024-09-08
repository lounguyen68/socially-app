import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PostScreen() {
  return (
    <SafeAreaView>
      <ThemedText type="title">{'Post Screen'}</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
