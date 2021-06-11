import LifeLineContainer from './LifeLineContainer';
import LifeLinePopUps from './LifeLinePopUps';
import Question from './Question';
import AnswerContainer from './AnswerContainer';
import './main.css';

function Main(props) {
    return (
        <div className='main'>
            <LifeLineContainer lifeline_fiftyfifty={false} lifeline_phoneafriend={true} lifeline_asktheaudience={true}/>
            <LifeLinePopUps current_money='$1 MILLION'/>
            <Question question={props.question} questionID={props.questionID}/>
            <AnswerContainer letter_1='A:' answer1={props.answer1} answer2={props.answer2} answer3={props.answer3} answer4={props.answer4} correct={props.correct} letter_2='B:' answer_2='Tiger' letter_3='C:' answer_3='Giraffe' letter_4='D:' answer_4='Hioppoptamus' />
        </div>
    );
}

export default Main;