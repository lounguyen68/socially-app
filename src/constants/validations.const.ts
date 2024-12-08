import * as Yup from 'yup';

const usernameRegex = /^[a-zA-Z0-9._]+$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(6, 'Username must be at least 6 characters')
    .max(20, 'Username must not exceed 20 characters'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must not exceed 50 characters'),
});

export const registerValidationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .matches(
      usernameRegex,
      'Username can only contain letters, numbers, dots, and underscores',
    )
    .min(6, 'Username must be at least 6 characters')
    .max(20, 'Username must not exceed 20 characters'),

  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email address'),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must not exceed 50 characters')
    .matches(
      passwordRegex,
      'Password must contain at least letter, number and !@#$%^&*',
    ),
});
