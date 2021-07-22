import LifeLineContainer from './LifeLineContainer';
import LifeLinePopUps from './LifeLinePopUps';
import Question from './Question';
import AnswerContainer from './AnswerContainer';
import './main.css';

function Main(props) {

    return (
        <div className='main'>
            {props.theMainState >= 0 ? <LifeLineContainer mainStateFlag={props.mainStateFlag} lifeline_fiftyfifty={props.lifeline_fiftyfifty} lifeline_phoneafriend={props.lifeline_phoneafriend} lifeline_asktheaudience={props.lifeline_asktheaudience}/> : null}
            {props.theMainState >= 1 ? <LifeLinePopUps mainStateFlag={props.mainStateFlag} current_money={props.currentMoney}/> : null}
            {props.theMainState >= 2 ? <Question mainStateFlag={props.mainStateFlag} question={props.question} questionID={props.questionID}/> : null}
            {props.theMainState >= 3 ? <AnswerContainer theAnswerState={props.theAnswerState} answerStateFlag={props.answerStateFlag} mainStateFlag={props.mainStateFlag} selectAnswer1={props.selectAnswer1} selectAnswer2={props.selectAnswer2} selectAnswer3={props.selectAnswer3} selectAnswer4={props.selectAnswer4} bgColor1={props.bgColor1} bgColor2={props.bgColor2} bgColor3={props.bgColor3} bgColor4={props.bgColor4} letter_1='A:' answer1={props.answer1} answer2={props.answer2} answer3={props.answer3} answer4={props.answer4} letter_2='B:' letter_3='C:' letter_4='D:' /> : null}
        </div>
    );
}

export default Main;