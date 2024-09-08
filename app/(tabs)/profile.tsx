import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView>
      <ThemedText type="title">{'Profile Screen'}</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
