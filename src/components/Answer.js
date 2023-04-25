import '../styles/answer.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Answer = (props) => {

    const visibleAnswers = useSelector(state => state.visibleAnswers);
    const dispatch = useDispatch();

    /* Delay showing the next answer - creates a cascade effect when each answer loads */
    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: 'advanceAnswerState' });
        }, 25);
    }, []);

    /* Saves the selected answer to the store so the FinalAnswer component can render the proper text */
    const changeAnswerSelected = (num) => {
        dispatch({ type: 'setSelectedAnswer', answer: num})
    }

    return (
        <div 
            className={`answer ${props.bgColor} ${!visibleAnswers.includes(props.answerIndex) ? 'hide-answer' : 'answer-visible'}`} 
            onClick={() => changeAnswerSelected(props.answerIndex)}>
            <div className='answer-text'>
                <span>{props.letter}</span><p>{props.answer}</p>
            </div>
        </div>
    )
}

export default Answer;