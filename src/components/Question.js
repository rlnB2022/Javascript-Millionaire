import '../styles/question.css';
import { useSelector } from 'react-redux';

const Question = (props) => {
    const questions = useSelector(state => state.questions);
    const currentLevel = useSelector(state => state.currentLevel);

    const answers = questions[currentLevel];

    const newQuestion = answers.question.replace(/\\n/g, "\n");

    return (
        <div className='question-container'>
            <div className='question'>
                <p>{newQuestion}</p>
            </div>
        </div>
    );
}

export default Question;