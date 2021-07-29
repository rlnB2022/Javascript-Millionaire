import LifeLineContainer from './LifeLineContainer';
import LifeLinePopUps from './LifeLinePopUps';
import Question from './Question';
import AnswerContainer from './AnswerContainer';
import './main.css';
import { useEffect } from 'react';

const Main = (props) => {

    useEffect(() => {
        if (props.theAnswerState === 4) {
            props.changeTimerVisible();
        }
    }, [props.theAnswerState]);

    return (
        <div className='main'>
            {props.theMainState >= 0 ? <LifeLineContainer
                mainStateFlag={props.mainStateFlag}
                lifeline_fiftyfifty={props.lifeline_fiftyfifty}
                lifeline_phoneafriend={props.lifeline_phoneafriend}
                lifeline_asktheaudience={props.lifeline_asktheaudience}
                changeViewLifeLineModal={props.changeViewLifeLineModal}
            /> : null}
            {props.theMainState >= 1 ? <LifeLinePopUps
                timerVisible={props.timerVisible}
                initTimer={props.initTimer}
                timerSeconds={props.timerSeconds}
                changeTimerSeconds={props.changeTimerSeconds}
                mainStateFlag={props.mainStateFlag}
                current_money={props.currentMoney}
            /> : null}
            {props.theMainState >= 2 ? <Question
                answers={props.answers}
                mainStateFlag={props.mainStateFlag}
                questionID={props.questionID}
            /> : null}
            {props.theMainState >= 3 ? <AnswerContainer
                changeAnswerSelected={props.changeAnswerSelected}
                answerSelected={props.answerSelected}
                theAnswerState={props.theAnswerState}
                answerStateFlag={props.answerStateFlag}
                mainStateFlag={props.mainStateFlag}
                answers={props.answers}
            /> : null}
        </div>
    );
}

export default Main;