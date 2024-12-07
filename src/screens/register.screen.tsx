import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { Formik } from 'formik';
import { LoginScreenProps } from '@/type';
import { usePopup } from '../context';
import { colors, registerValidationSchema } from '../constants';
import { apiRegister } from '../api/register.api';

const RegisterScreen = ({ navigation }: LoginScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { showPopup } = usePopup();

  const handleRegister = async (
    values: { username: string; email: string; password: string },
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setSubmitting(true);
    try {
      await apiRegister({
        name: values.username,
        email: values.email,
        password: values.password,
      });
      navigation.navigate('login');
      ToastAndroid.show(
        'Welcome to Socially! Thanks for signing up.',
        ToastAndroid.SHORT,
      );
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Registration failed';
      showPopup(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>Sign up to Socially</Text>
      </View>

      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={registerValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleRegister(values, setSubmitting);
        }}
        validateOnChange={false}
      >
        {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
          <View style={styles.form}>
            <TextInput
              style={[styles.input, errors.username && styles.errorInput]}
              placeholder="Username"
              onChangeText={handleChange('username')}
              value={values.username}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
            <TextInput
              style={[styles.input, errors.email && styles.errorInput]}
              placeholder="Email"
              onChangeText={handleChange('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <View>
              <TextInput
                style={[styles.input, errors.password && styles.errorInput]}
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
                <ActivityIndicator color={colors.whiteColor} />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          You have an account?{' '}
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate('login')}
          >
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
    backgroundColor: colors.lightWhiteColor,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: '#FF5A5A',
    borderWidth: 1,
  },
  togglePassword: {
    position: 'absolute',
    right: 15,
    top: 15,
    color: colors.primaryColor,
    fontWeight: 'bold',
  },
  clearInput: {
    color: colors.secondaryColor,
    textAlign: 'right',
    marginBottom: 10,
    fontSize: 12,
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
