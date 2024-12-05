import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { LoginScreenProps } from '@/type';
import { usePopup, useServices } from '../context';
import { apiLogin } from '../api/login.api';
import { colors } from '../constants';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { http, storageService } = useServices();
  const { showPopup } = usePopup();

  const handleLogin = () => {
    setLoading(true);
    apiLogin({ name: username, password })
      .then((userData) => {
        const { user, accessToken, refreshToken } = userData;
        dispatch(login(userData));
        http.setToken(accessToken);
        storageService.setRefreshToken(refreshToken);
        storageService.setUserInfo(user);
      })
      .catch((error) => {
        showPopup(error.message);
      })
      .finally(() => setLoading(false));
  };

  const navigateToRegister = () => {
    navigation.navigate('register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <LogoSVG width={150} height={50} /> */}
        <Text style={styles.title}>Sign in to Socially</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        {/* {usernameError ? (
          <Text style={styles.errorText}>{usernameError}</Text>
        ) : null} */}

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {/* {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null} */}

        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.primaryColor} />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don’t have an account?{' '}
          <Text style={styles.footerLink} onPress={navigateToRegister}>
            Sign up, it’s free!
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.whiteColor,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: colors.lightGrayColor,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  errorText: {
    color: '#FF5A5A',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  disabledButton: {
    backgroundColor: colors.lightGrayColor,
  },
  buttonText: {
    color: colors.whiteColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    textAlign: 'center',
  },
  footerLink: {
    color: colors.primaryColor,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
