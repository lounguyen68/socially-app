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
import { Formik } from 'formik';
import { login } from '../redux/userSlice';
import { LoginScreenProps } from '@/type';
import { usePopup, useServices } from '../context';
import { apiLogin } from '../api/login.api';
import { colors, loginValidationSchema } from '../constants';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { http, storageService } = useServices();
  const { showPopup } = usePopup();

  const handleLogin = async (
    values: { username: string; password: string },
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setSubmitting(true);
    try {
      const userData = await apiLogin({
        name: values.username,
        password: values.password,
      });
      const { user, accessToken, refreshToken } = userData;

      dispatch(login(userData));
      http.setToken(accessToken);
      storageService.setRefreshToken(refreshToken);
      storageService.setUserInfo(user);
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      showPopup(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('register');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>Sign in to Socially</Text>
      </View>

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleLogin(values, setSubmitting);
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
          <View style={styles.form}>
            <TextInput
              style={[
                styles.input,
                errors.username && {
                  borderColor: '#FF5A5A',
                  borderWidth: 0.5,
                },
              ]}
              placeholder="Username"
              onChangeText={handleChange('username')}
              value={values.username}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <View>
              <TextInput
                style={[
                  styles.input,
                  errors.password && {
                    borderColor: '#FF5A5A',
                    borderWidth: 0.5,
                  },
                ]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                onChangeText={handleChange('password')}
                value={values.password}
              />
              <Text
                style={styles.togglePassword}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={[styles.button, isSubmitting && styles.disabledButton]}
              onPress={handleSubmit as any}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color={colors.primaryColor} />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>

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
    backgroundColor: colors.lightWhiteColor,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  errorText: {
    color: '#FF5A5A',
    fontSize: 12,
    marginBottom: 10,
  },
  togglePassword: {
    position: 'absolute',
    right: 15,
    top: 15,
    color: colors.primaryColor,
    fontWeight: 'bold',
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
