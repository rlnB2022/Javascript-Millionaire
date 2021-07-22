import './answers.css';
import Answer from './Answer';
import { useEffect } from 'react';

function AnswerContainer(props) {

    return (
        <div className='answer-container'>
            {props.theAnswerState >= 0 ? <Answer answerStateFlag={props.answerStateFlag} answerIndex={0} selectAnswer={props.selectAnswer1} bgColor={props.bgColor1} letter={props.letter_1} answer={props.answer1} /> : null}
            {props.theAnswerState >= 1 ? <Answer answerStateFlag={props.answerStateFlag} answerIndex={1} selectAnswer={props.selectAnswer2} bgColor={props.bgColor2} letter={props.letter_2} answer={props.answer2} /> : null}
            {props.theAnswerState >= 2 ? <Answer answerStateFlag={props.answerStateFlag} answerIndex={2} selectAnswer={props.selectAnswer3} bgColor={props.bgColor3} letter={props.letter_3} answer={props.answer3} /> : null}
            {props.theAnswerState >= 3 ? <Answer answerStateFlag={props.answerStateFlag} answerIndex={3} selectAnswer={props.selectAnswer4} bgColor={props.bgColor4} letter={props.letter_4} answer={props.answer4}/> : null}
        </div>
    );
}

export default AnswerContainer;