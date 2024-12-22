import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const HomeScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 32 }}>{user.accessToken}</Text>
      <Text style={{ fontSize: 32 }}>{user.refreshToken}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
