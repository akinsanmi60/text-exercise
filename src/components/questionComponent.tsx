import { useFieldArray, useForm } from 'react-hook-form';
import { displayError } from '../shared/Toast/Toast';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { QuestionFormValidation } from '../validation/questionForm.validation';
import { IQuestionProps } from '../types/contextProvider.type';
import {
  usePostQuestion,
  useUpdateQuestion,
} from '../services/question.service';

function Questions({ QuesProp }: IQuestionProps) {
    const {
      control,
      handleSubmit,
      register,
      formState: { isDirty, isValid },
      setValue,
      reset,
    } = useForm({
      defaultValues: {
        question: '',
        options: [{ option: '' }],
      },
      resolver: yupResolver(QuestionFormValidation),
    });
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'options', // this is the name of your field array
    });
  const { mutate: postQuesMutation, isLoading: postQuesLoading } =
    usePostQuestion(reset);

  const { mutate: updateQuesMutation, isLoading: updateQuesLoading } =
    useUpdateQuestion(QuesProp.id || '', reset, QuesProp?.closeModal || (() => {}));

  

  useEffect(() => {
    if (QuesProp.incomingQuestion) {
      setValue(
        'options',
        QuesProp.incomingQuestion?.options.map(option => ({ option: option })),
      );

      setValue('question', QuesProp.incomingQuestion?.question);
    }
  }, [QuesProp.incomingQuestion, setValue]);

  const onSubmit = (data: {
    question: string;
    options: { option: string }[];
  }) => {
    if (data.options.length <= 2) {
      displayError('Please add at least 3 options');
      return;
    }

    if (data.options.length > 5) {
      displayError('Please add at most 5 options');
      return;
    }

    const payloadReformed = {
      question: data.question,
      options: data.options.map((option: { option: string }) => option.option),
    };

    if (QuesProp.incomingQuestion === null) {
      postQuesMutation({ payload: payloadReformed });
      return;
    } else if( QuesProp.incomingQuestion !== null) {
      updateQuesMutation({ payload: payloadReformed });
    }
  };

  const addNewInput = () => {
    if (fields.length >= 5) {
      displayError('Please add at most 5 options');
      return;
    }
    append({ option: '' });
  };

  const removeInput = (index: number) => {
    if (fields.length === 1) {
      displayError('Please add at least one option');
      return;
    }
    remove(index);
  };

  const isLoading = postQuesLoading || updateQuesLoading;

  return (
    <div className="flex justify-center gap-y-4 flex-col items-center">
      <h1 className="text-[30px] font-[500] mt-[30px]">{QuesProp.title}</h1>
      <div className="">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`w-[550px] h-[600px] overflow-y-auto scrollbar-none border border-gray-700 p-[20px] rounded-md ${QuesProp.quesClassName}`}
        >
          <div className="flex flex-col gap-y-3">
            <label htmlFor="question"> Question</label>
            <textarea
              {...register('question')}
              className="w-full outline-none border border-gray-500 p-[12px] rounded-md"
              rows={5}
              cols={50}
              maxLength={200}
              placeholder="Enter your question here"
            />
          </div>

          <div className="">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex flex-col gap-y-3 mt-[20px]">
                  <label htmlFor={field.id} className="">
                    Option {index + 1}
                  </label>
                  <div className="flex gap-x-3">
                    <div className="w-full flex flex-col gap-y-1">
                      <input
                        placeholder="Please provide options"
                        className="w-full p-3 rounded-md border border-gray-500 outline-none"
                        {...register(`options.${index}.option`)} // i register each input with a unique name
                      />
                    </div>
                    <button
                      type="button"
                      className="text-red-500 bg-red-200 p-2 border border-red-300 rounded-md"
                      onClick={() => removeInput(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="my-[10px] text-[15px] font-[400] italic ">
            Click the button to add more{' '}
            <span
              className="text-green-600 cursor-pointer underline"
              onClick={addNewInput}
            >
              {' '}
              options
            </span>
          </p>

          <div className="flex justify-center mt-[30px]">
            <button
              type="submit"
              className="btn-primary-min disabled:bg-slate-400 disabled:cursor-not-allowed"
              disabled={!isDirty || !isValid || isLoading}
            >
              {isLoading ? 'Submiting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Questions;
