import { useParams } from 'react-router-dom';
import GetAllQuestion from './getAllQuestion';
import CreateQuestions from './createQuestions';

function ViewQuestion() {
  const { tab } = useParams();
  const currentTab = tab || 'view';

  return (
    <div className="max-content">
      <div className="container">
        <div className='pt-4'>

        {
          currentTab === 'view' && (
            <GetAllQuestion />
            )
          }

        {
          currentTab === 'create' && (
            <CreateQuestions />
            )
          }
          </div>
      </div>
    </div>
  );
}

export default ViewQuestion;
