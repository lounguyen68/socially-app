import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/src/components/Avatar.component';
import { Button } from '@/src/components/Button.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const ProfileScreen = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.userInfo}>
      <View style={styles.background} />
      <Avatar src={user?.urlAvatar} />
      <Text>{user?.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  userInfo: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderColor: '#E1F6F4',
  },
  background: {
    backgroundColor: '#E1F6F4',
    width: 600,
    height: 600,
    position: 'absolute',
    top: -490,
    borderRadius: 300,
  },
});
