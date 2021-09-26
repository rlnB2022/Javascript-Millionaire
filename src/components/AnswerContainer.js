import './AnswerContainer.css';
import Answer from './Answer';

const AnswerContainer = (props) => {

    let bgColors = [,,,];

    console.log(props.answerSelected);

    bgColors[props.answerSelected] = 'orange';

    return (
        <div className='answer-container'>
            {props.theAnswerState >= 0 ? <Answer answerStateFlag={props.answerStateFlag}
                answerIndex={0}
                changeAnswerSelected={props.changeAnswerSelected}
                bgColor={bgColors[0]}
                letter='A:'
                answer={props.answers.answer_1}
                changeFinalAnswerVisible={props.changeFinalAnswerVisible}
            /> : null}
            {props.theAnswerState >= 1 ? <Answer
                answerStateFlag={props.answerStateFlag}
                answerIndex={1}
                changeAnswerSelected={props.changeAnswerSelected}
                changeFinalAnswerVisible={props.changeFinalAnswerVisible}
                bgColor={bgColors[1]}
                letter='B:'
                answer={props.answers.answer_2} /> : null}
            {props.theAnswerState >= 2 ? <Answer
                answerStateFlag={props.answerStateFlag}
                answerIndex={2}
                changeAnswerSelected={props.changeAnswerSelected}
                changeFinalAnswerVisible={props.changeFinalAnswerVisible}
                bgColor={bgColors[2]}
                letter='C:'
                answer={props.answers.answer_3}
            /> : null}
            {props.theAnswerState >= 3 ? <Answer
                answerStateFlag={props.answerStateFlag}
                answerIndex={3}
                changeAnswerSelected={props.changeAnswerSelected}
                bgColor={bgColors[3]}
                letter='D:'
                answer={props.answers.answer_4}
            /> : null}
        </div>
    );
}

export default AnswerContainer;