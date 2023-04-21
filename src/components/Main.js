import LifeLineContainer from './LifeLineContainer';
import LifeLinePopUps from './LifeLinePopUps';
import Question from './Question';
import AnswerContainer from './AnswerContainer';
import '../styles/main.css';
import { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';

const Main = (props) => {
    const mainState = useSelector(state => state.mainState);
    const answerState = useSelector(state => state.answerState);
    const dispatch = useDispatch();

    /* When the main component mounts, introduce each of the components below one after the other */
    useEffect(() => {
        const mainTimeout = setInterval(() => {
            dispatch({ type: 'advanceMainState' });
            if(mainState >= 3) {
                clearInterval(mainTimeout);
            }
        }, 2000);
    }, []);

    useEffect(() => {
        if (answerState === 4) {
            batch(() => {
                dispatch({ type: 'toggleTimerVisible' });
                dispatch({ type: 'toggleLifeLineClickable '});
            })
        }
    }, [answerState]);

    return (
        <div className='main'>
            {mainState >= 0 
                ? <LifeLineContainer
                    lifeline_fiftyfifty={props.lifeline_fiftyfifty}
                    lifeline_phoneafriend={props.lifeline_phoneafriend}
                    lifeline_asktheaudience={props.lifeline_asktheaudience}/>
                : null}
            {mainState >= 1 
                ? <LifeLinePopUps /> 
                : null}
            {mainState >= 2 
                ? <Question
                    answers={props.answers}
                    questionID={props.questionID}/> 
                : null}
            {mainState >= 3 
                ? <AnswerContainer
                    changeAnswerSelected={props.changeAnswerSelected}
                    answerSelected={props.answerSelected}
                    theAnswerState={props.theAnswerState}
                    answerStateFlag={props.answerStateFlag}
                    answers={props.answers}/> 
                : null}
        </div>
    );
}

export default Main;