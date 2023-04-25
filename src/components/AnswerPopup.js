import '../styles/answerpopup.css';
import { useSelector } from 'react-redux';

const AnswerPopup = (props) => {

    /* Get the questions, answers and text from the store */
    const questions = useSelector(state => state.questions);
    const currentLevel = useSelector(state => state.currentLevel);
    const correctAnswerText = useSelector(state => state.correctAnswerText);
    const answerButtonText = useSelector(state => state.answerButtonText);

    const correctAnswer =questions[currentLevel].answer_correct;
    const answers = questions[currentLevel];

    let choices = [answers.answer_1, answers.answer_2, answers.answer_3, answers.answer_4];

    return (
        <div className='answer-popup-outer'>
            <div className='answer-popup-container'>
                <div className='answer-popup__message answer-popup__padding'>{correctAnswerText}</div>
                <div className='answer-popup__correct answer-popup__padding'>{choices[correctAnswer - 1]}</div>
                <div className='answer-popup__button answer-popup__padding' onClick={props.nextQuestion}>{answerButtonText}</div>
            </div>
        </div>
    )
}

export default AnswerPopup;