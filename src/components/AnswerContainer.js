import './answers.css';
import Answer from './Answer';

function AnswerContainer(props) {
    return (
        <div className='answer-container'>
            <Answer letter={props.letter_1} answer={props.answer_1} />
            <Answer letter={props.letter_2} answer={props.answer_2} />
            <Answer letter={props.letter_2} answer={props.answer_3} />
            <Answer letter={props.letter_4} answer={props.answer_4}/>
        </div>
    );
}

export default AnswerContainer;