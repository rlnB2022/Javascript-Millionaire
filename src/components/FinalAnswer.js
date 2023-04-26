import '../styles/finalanswer.css';
import { useDispatch, useSelector } from 'react-redux';

const FinalAnswer = ({isAnswerCorrect}) => {

    const dispatch = useDispatch();

    const questions = useSelector(state => state.questions);
    const currentLevel = useSelector(state => state.currentLevel);
    const selectedAnswer = useSelector(state => state.selectedAnswer);
    
    const answers = questions[currentLevel];

    const choices = [answers.answer_1, answers.answer_2, answers.answer_3, answers.answer_4];

    /* Hide the Final Answer component */
    const changeVisible = () => {
        dispatch({ type: 'toggleFinalAnswerVisible' });
    };

    return (
        <div className='final-answer-outer'>
            <div className='final-answer-container'>
                <div className='bg-image'>
                    <p className='final-answer-header'>Final Answer?</p>
                </div>
                <div className='final-answer-selected'>
                    {choices[selectedAnswer]}
                </div>
                <div className='final-answer-buttons'>
                    <div className='final-answer-btn final-answer-no' onClick={changeVisible}>
                        <p>No</p>
                    </div>
                    <div className='final-answer-btn final-answer-yes' onClick={() => isAnswerCorrect(selectedAnswer + 1)}>
                        <p>Yes</p>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default FinalAnswer;