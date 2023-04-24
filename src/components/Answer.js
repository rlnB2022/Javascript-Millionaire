import '../styles/answer.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Answer = (props) => {

    const visibleAnswers = useSelector(state => state.visibleAnswers);
    const dispatch = useDispatch();

    useEffect(() => {
        const txtTimeout = setTimeout(() => {
            dispatch({ type: 'advanceAnswerState' });
        }, 25);
    }, []);

    const changeAnswerSelected = (num) => {
        dispatch({ type: 'setSelectedAnswer', answer: num})
    }

    return (
        <div className={`answer ${props.bgColor} ${!visibleAnswers.includes(props.answerIndex) ? 'hide-answer' : 'answer-visible'}`} onClick={() => changeAnswerSelected(props.answerIndex)}>
            <div className='answer-text'>
                <span>{props.letter}</span><p>{props.answer}</p>
            </div>
        </div>
    )
}

export default Answer;