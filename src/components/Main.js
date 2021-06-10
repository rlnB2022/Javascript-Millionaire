import LifeLineContainer from './LifeLineContainer';
import LifeLinePopUps from './LifeLinePopUps';
import Question from './Question';
import AnswerContainer from './AnswerContainer';
import './main.css';

function Main() {
    return (
        <div className='main'>
            <LifeLineContainer />
            <LifeLinePopUps />
            <Question />
            <AnswerContainer />
        </div>
    );
}

export default Main;