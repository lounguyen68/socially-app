import * as Yup from 'yup';

const usernameRegex = new RegExp(/^[a-zA-Z0-9._]+$/);
const passwordRegex = new RegExp(/^(?=.*[A-Za-z])[A-Za-z\d]{7,}$/);

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .required()
    .matches(
      usernameRegex,
      'username can only contain letters, numbers, dots, and underscores',
    )
    .min(6)
    .max(20),

  password: Yup.string()
    .required()
    .min(7)
    .matches(passwordRegex, 'password must contain at least one letter'),
});

export const registerValidationSchema = Yup.object({
  username: Yup.string()
    .required()
    .matches(
      usernameRegex,
      'username can only contain letters, numbers, dots, and underscores',
    )
    .min(6)
    .max(20),

  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email'),

  password: Yup.string()
    .required()
    .min(7)
    .matches(passwordRegex, 'password must contain at least one letter'),
});
