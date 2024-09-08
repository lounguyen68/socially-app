import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoriteScreen() {
  return (
    <SafeAreaView>
      <ThemedText type="title">FavoriteScreen!</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
