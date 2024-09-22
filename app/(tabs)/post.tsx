import { Header } from '@/components/Header';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PostScreen() {
  return (
    <SafeAreaView>
      <Header title="Create Post" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
