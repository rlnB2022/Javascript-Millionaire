import './answers.css';
import Answer from './Answer';

function AnswerContainer(props) {
    return (
        <div className='answer-container'>
            <Answer letter={props.letter_1} answer={props.answer1} />
            <Answer letter={props.letter_2} answer={props.answer2} />
            <Answer letter={props.letter_3} answer={props.answer3} />
            <Answer letter={props.letter_4} answer={props.answer4}/>
        </div>
    );
}

export default AnswerContainer;