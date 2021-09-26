import { useEffect } from 'react';
import './answer.css';

const Answer = (props) => {

    useEffect(() => {
        const txtInterval = setInterval(function () {
            clearInterval(txtInterval);
            props.answerStateFlag();
        }, 25);
    }, []);

    let background;
    let answer_selected_color = {
        color: '#fff'
    };

    return (
        <div className='answer answer-visible' onClick={() => props.changeAnswerSelected(props.answerIndex)}>
            <div className='answer-text'>
                <span style={answer_selected_color}>{props.letter}</span><p style={answer_selected_color}>{props.answer}</p>
            </div>
        </div>
    )
}

export default Answer;