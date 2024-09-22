import { Header } from '@/components/Header';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Header title="News Feed" headerLeft={() => <></>} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
