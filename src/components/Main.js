import LifeLineContainer from './LifeLineContainer';
import LifeLinePopUps from './LifeLinePopUps';
import Question from './Question';
import AnswerContainer from './AnswerContainer';
import '../styles/main.css';
import { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';

const Main = ({answerSelected, questionID}) => {
    const mainState = useSelector(state => state.mainState);
    const answerState = useSelector(state => state.answerState);
    const dispatch = useDispatch();

    /* When the main component mounts, introduce each of the components below, one after the other */
    useEffect(() => {
        const mainTimeout = setInterval(() => {
            dispatch({ type: 'advanceMainState' });
            if(mainState >= 3) {
                clearInterval(mainTimeout);
            }
        }, 1000);
        /* Cleanup: clear the interval from memory */
        return () => clearInterval(mainTimeout);
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
            {mainState >= 0 && <LifeLineContainer />}
            {mainState >= 1 && <LifeLinePopUps />}
            {mainState >= 2 && <Question questionID={questionID}/>}
            {mainState >= 3 && <AnswerContainer answerSelected={answerSelected}/>}
        </div>
    );
}

export default Main;