import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../config/apiCaller';
import {
  IError,
  IGetToken,
  IGetTokenType,
  IQuestion,
  IQuestionObj,
} from '../types/contextProvider.type';
import { displayError, displaySuccess } from '../shared/Toast/Toast';
import { setToken } from '../hooks/localStorageHook';
import { useNavigate } from 'react-router-dom';
import { UseFormReset } from 'react-hook-form';

const useGetToken = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, isError } = useMutation(
    ({ payload }: { payload: IGetTokenType }) =>
      postRequest<IGetTokenType, IGetToken>({
        url: 'token',
        payload: payload,
      }),
    {
      onSuccess: data => {
        if (data) {
          displaySuccess('Token generated successfully');
          setToken(data.token);
          navigate('/viewquestions/view');
        }
      },
      onError: (error: IError) => {
        const { message } = error || ({} as { message: string });
        displayError(message || 'Error generating token');
      },
    },
  );
  return {
    isLoading,
    mutate,
    isError,
  };
};

const useGetAllQuestions = () => {
  const { data, ...rest } = useQuery(['questions'], () =>
    getRequest<IQuestion>({ url: 'questions' }),
  );

  return {
    data,
    ...rest,
  };
};

const usePostQuestion = (reset: UseFormReset<IQuestionObj>) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    ({ payload }: { payload: IQuestionObj }) =>
      postRequest<IQuestionObj, IQuestion>({
        url: 'questions',
        payload: payload,
      }),
    {
      onSuccess: data => {
        if (data) {
          displaySuccess('Question created successfully');
          queryClient.invalidateQueries(['questions']);
          reset();
        }
      },
      onError: (error: IError) => {
        const { message } = error || ({} as { message: string });
        displayError(message || 'Error creating question');
      },
    },
  );
  return {
    mutate,
    isLoading,
    isError,
  };
};

const useUpdateQuestion = (
  id: string,
  reset: UseFormReset<IQuestionObj>,
  closeModal: () => void,
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    ({ payload }: { payload: IQuestionObj }) =>
      putRequest<IQuestionObj, any>({
        url: `questions/${id}`,
        payload: payload,
      }),
    {
      onSuccess: () => {
        displaySuccess('Question updated successfully');
        queryClient.invalidateQueries(['questions']);
        reset();
        closeModal();
      },
      onError: (error: IError) => {
        const { message } = error || ({} as { message: string });
        displayError(message || 'Error updating question');
      },
    },
  );
  return {
    mutate,
    isLoading,
    isError,
  };
};
const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation(
    ({ id }: { id: string }) => deleteRequest<any>({ url: `questions/${id}` }),
    {
      onSuccess: () => {
        displaySuccess('Question deleted successfully');
        queryClient.invalidateQueries(['questions']);
      },
      onError: (error: IError) => {
        const { message } = error || ({} as { message: string });
        displayError(message || 'Error deleting question');
      },
    },
  );
  return {
    mutate,
    isLoading,
    isError,
  };
};

export {
  useGetToken,
  useGetAllQuestions,
  usePostQuestion,
  useUpdateQuestion,
  useDeleteQuestion,
};
