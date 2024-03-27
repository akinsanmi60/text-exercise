import * as yup from 'yup';

export const MailValidationSchema = yup
  .object({
    email: yup
      .string()
      .required('Enter your email')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email'),
  })
  .required();
