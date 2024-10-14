import { Button, StyleSheet, Text, View } from 'react-native';
import ScreenComponent from '../components/Screen.component';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { decrement, increment } from '../redux/counterSlice';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const HomeScreen = () => {
  const { value } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ScreenComponent title="Home" headerLeft={<></>}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity onPress={() => dispatch(decrement())}>
          <Text style={{ fontSize: 32 }}>{'decrement'}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 32 }}>{value}</Text>
        <TouchableOpacity onPress={() => dispatch(increment())}>
          <Text style={{ fontSize: 32 }}>{'increment'}</Text>
        </TouchableOpacity>
      </View>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({});
