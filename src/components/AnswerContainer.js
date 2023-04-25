import '../styles/AnswerContainer.css';
import Answer from './Answer';
import { useSelector } from 'react-redux';

const AnswerContainer = (props) => {

    const answerState = useSelector(state => state.answerState);
    const questions = useSelector(state => state.questions);
    const currentLevel = useSelector(state => state.currentLevel);

    const answers = questions[currentLevel];

    /* This is used to pass the selected color (orange) to the correct Answer component */
    let bgColors = [,,,];
    bgColors[props.answerSelected] = 'orange';

    return (
        <div className='answer-container'>
            {answerState >= 0 ? <Answer
                answerIndex={0}
                bgColor={bgColors[0]}
                letter='A:'
                answer={answers.answer_1}
                changeFinalAnswerVisible={props.changeFinalAnswerVisible}
            /> : null}
            {answerState >= 1 ? <Answer
                answerIndex={1}
                changeFinalAnswerVisible={props.changeFinalAnswerVisible}
                bgColor={bgColors[1]}
                letter='B:'
                answer={answers.answer_2} /> : null}
            {answerState >= 2 ? <Answer
                answerIndex={2}
                changeFinalAnswerVisible={props.changeFinalAnswerVisible}
                bgColor={bgColors[2]}
                letter='C:'
                answer={answers.answer_3}
            /> : null}
            {answerState >= 3 ? <Answer
                answerIndex={3}
                bgColor={bgColors[3]}
                letter='D:'
                answer={answers.answer_4}
            /> : null}
        </div>
    );
}

export default AnswerContainer;