import { IQuestionObj } from '../types/contextProvider.type';
import Questions from './questionComponent';

type IEditProps = {
  onBackgroundClick: () => void;
  viewEdit: {
    view: boolean;
    incomingQuestionDetails: IQuestionObj | null;
    questionID: string;
};
};

function EditQuestion({ viewEdit, onBackgroundClick}: IEditProps) {
  return (
    viewEdit.view && (
      <div className="relative">
        <div
          className="fixed inset-0 z-[70] transition-opacity bg-gray-500 bg-opacity-75 overflow-auto"
          onClick={onBackgroundClick}
        >
          <div className=" z-[999999] flex flex-col items-center justify-center min-h-full">
            <div
              onClick={e => {
                e.stopPropagation();
              }}
              className="w-[600px] bg-white p-5 rounded-md"
            >
              <Questions
                QuesProp={{
                  title: 'Edit your question',
                  incomingQuestion: viewEdit.incomingQuestionDetails,
                  quesClassName: 'h-[500px] overflow-auto',
                                  id: viewEdit.questionID,
                  closeModal: onBackgroundClick,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default EditQuestion;
