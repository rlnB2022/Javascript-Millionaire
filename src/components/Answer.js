import '../styles/answer.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Answer = (props) => {

    const visibleAnswers = useSelector(state => state.visibleAnswers);

    useEffect(() => {
        const txtTimeout = setTimeout(() => {
            props.answerStateFlag();
        }, 25);
    }, []);

    return (
        <div className={`answer ${props.bgColor} ${!visibleAnswers.includes(props.answerIndex) ? 'hide-answer' : 'answer-visible'}`} onClick={() => props.changeAnswerSelected(props.answerIndex)}>
            <div className='answer-text'>
                <span>{props.letter}</span><p>{props.answer}</p>
            </div>
        </div>
    )
}

export default Answer;