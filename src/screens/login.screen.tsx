import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { LoginScreenProps } from '@/type';
import { usePopup, useServices } from '../context';
import { apiLogin } from '../api/login.api';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { http, storageService } = useServices();
  const { showPopup } = usePopup();

  const handleLogin = () => {
    apiLogin({ username, password })
      .then(({ userInfo, userToken }) => {
        const userData = {
          user: userInfo,
          accessToken: userToken.accessToken,
          refreshToken: userToken.refreshToken,
        };
        dispatch(login(userData));
        http.setToken(userToken.accessToken);
        storageService.setRefreshToken(userToken.refreshToken);
        storageService.setUserInfo(userInfo);
      })
      .catch((error) => {
        showPopup(error.message);
      });
  };

  const navigateToRegister = () => {
    navigation.navigate('register');
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={navigateToRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default LoginScreen;
