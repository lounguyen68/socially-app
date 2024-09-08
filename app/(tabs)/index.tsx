import { Button } from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ThemedText type="title">HomeScreen!</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
