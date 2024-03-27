import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetToken } from '../../services/question.service';
import { displayError } from '../../shared/Toast/Toast';
import { IGetTokenType } from '../../types/contextProvider.type';
import { MailValidationSchema } from '../../validation/mailForm.validation';

function Login() {
  const { mutate, isLoading } = useGetToken();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(MailValidationSchema),
  });

  const submitForm = (formValue: IGetTokenType) => {
    mutate({ payload: formValue });
  };

  if (errors.email) {
    displayError(errors.email.message as string);
  }

  return (
    <div className="h-screen flex justify-center flex-col items-center">
      <form onSubmit={handleSubmit(submitForm)}>
        <h1 className="text-[20px] font-[700] mb-5 text-center">Login To Continue</h1>
        <div className="flex flex-col w-full">
          <input
            type="text"
            {...register('email')}
            placeholder="Enter your email"
            className="border-[1px] outline-none w-[390px] px-[10px] py-[13px] border-gray-500 rounded-md"
          />
        </div>

        <div className="flex justify-end mt-3">
          <button className="btn-primary-min disabled:bg-slate-300 disabled:cursor-not-allowed" disabled={isLoading || !isDirty || !isValid}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
