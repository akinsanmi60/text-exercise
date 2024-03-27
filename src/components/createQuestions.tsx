import Questions from './questionComponent';

function CreateQuestions() {
  return (
    <Questions
      QuesProp={{
        title: 'Create a new question',
        incomingQuestion: null,
        quesClassName: 'h-[600px] overflow-auto',
      }}
    />
  );
}

export default CreateQuestions;
