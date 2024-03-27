import * as yup from 'yup';

export const QuestionFormValidation = yup.object({
  question: yup.string().required('Question is required'),
  options: yup.array().required('Options are required'),
});
