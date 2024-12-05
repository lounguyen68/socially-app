import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LoginScreenProps } from '@/type';
import { usePopup } from '../context';
import { colors } from '../constants';
import { apiRegister } from '../api/register.api';

const RegisterScreen = ({ navigation }: LoginScreenProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showPopup } = usePopup();

  const handleRegister = () => {
    setLoading(true);
    apiRegister({
      name: username,
      email,
      password,
    })
      .then(() => navigateToLogin())
      .catch((error) => {
        showPopup(error.message);
      })
      .finally(() => setLoading(true));
  };

  const navigateToLogin = () => {
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>Sign up to Socially</Text>
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
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

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
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.primaryColor} />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          You have an account?{' '}
          <Text style={styles.footerLink} onPress={navigateToLogin}>
            Sign in, here!
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
    borderWidth: 1,
    borderColor: '#444',
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
    backgroundColor: colors.grayColor,
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

export default RegisterScreen;
