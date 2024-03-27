import { useNavigate } from 'react-router-dom';
import {
  useGetAllQuestions,
  useDeleteQuestion,
} from '../services/question.service';
import { useState } from 'react';
import { IQuestionObj } from '../types/contextProvider.type';
import EditQuestion from './editQuestion';

function GetAllQuestion() {
  const { data, isLoading, isRefetching } = useGetAllQuestions();
  const navigate = useNavigate();
  const [viewEdit, setViewEdit] = useState({
    view: false,
    incomingQuestionDetails: {} as IQuestionObj | null,
    questionID: '',
  });

  const { mutate, isLoading: deleteLoading } = useDeleteQuestion();

  const renderCreateQuestion = () => {
    return (
      <div className="flex justify-end w-full gap-3">
        <button
          className="btn-primary-min"
          onClick={() => navigate('/viewquestions/create')}
        >
          Create Question
        </button>
      </div>
    );
  };

  const closeModal = () => {
    setViewEdit({
      view: false,
      incomingQuestionDetails: null,
      questionID: '',
    });
  };

  const renderQuestion = () => {
    if (isLoading || isRefetching) {
      return (
        <div className="font-title flex flex-col justify-center items-center py-5 text-gray-500 bg-white w-full">
          Loading Questions ...
        </div>
      );
    }

    if (!data || Object.keys(data).length === 0) {
      return (
        <div className="font-title h-full flex flex-col justify-center items-center py-5 text-gray-500 w-full bg-white">
          <p>No questions found</p>
        </div>
      );
    }

    return Object.keys(data).map(questionId => {
      const questionData = data[questionId];
      return (
        <div
          key={questionId}
          className="mt-[30px] text-[20px] font-[500] border-b border-gray-500 last:border-none"
        >
          <div>
            <span>Question:</span> <span>{questionData?.question}</span>
          </div>
          <div className="p-[10px] cursor-pointer">
            <span>Options:</span>
            <ul className="list-disc flex px-[30px] mt-[10px] flex-col gap-y-3">
              {questionData?.options.map((option, index) => (
                <li key={index} className="list-item">
                  {option}
                </li>
              ))}
            </ul>

            <div className="flex justify-end w-full gap-3">
              <div>
                <p
                  className="text-[#0B6E4F] cursor-pointer text-[14px]"
                  onClick={() => handleEditClick(questionId, questionData)}
                >
                  Edit
                </p>
              </div>

              <div>
                <p
                  className="text-red-500 cursor-pointer text-[14px]"
                  onClick={() => handleDeleteClick(questionId)}
                >
                  {deleteLoading ? 'Deleting...' : 'Delete'}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleEditClick = (
    questionId: string,
    questionData: IQuestionObj | null,
  ) => {
    setViewEdit({
      view: true,
      incomingQuestionDetails: questionData as IQuestionObj,
      questionID: questionId,
    });
  };

  const handleDeleteClick = (questionId: string) => {
    mutate({ id: questionId });
  };

  return (
    <div>
      {renderCreateQuestion()}
      <div className="mt-[20px]">
        <h1 className="text-[40px] text-center">GetAllQuestion</h1>
      </div>
      <div className="flex justify-center w-full overflow-y-auto scrollbar-none">
        <div>{renderQuestion()}</div>
      </div>
      {viewEdit.view && (
        <EditQuestion viewEdit={viewEdit} onBackgroundClick={closeModal} />
      )}
    </div>
  );
}

export default GetAllQuestion;
