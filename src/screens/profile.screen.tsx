import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/src/components/Avatar.component';
import { Button } from '@/src/components/Button.component';
import ScreenComponent from '@/src/components/Screen.component';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ProfileScreen = () => {
  const user = {
    name: 'Nguyen Phuong Longg',
    avatar:
      'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/449091703_4572873969603448_1541748669804218095_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=xMKhA1XtYzcQ7kNvgE1ufW0&_nc_ht=scontent.fhan2-3.fna&oh=00_AYCXLcIXvNRQO7y2rrmwV1eRpm5cvP1jEMLjAIk52UaVig&oe=66F5E252',
  };

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
      <Avatar src={user.avatar} />
      <Text>{user.name}</Text>
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
