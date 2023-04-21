import '../styles/timer.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';

const Timer = () => {

    const timerInitSeconds = useSelector(state => state.timerInitSeconds);
    const dispatch = useDispatch();

    let [seconds, setSeconds] = useState(0);

    /* When the component mounts, setup the amount of seconds to countdown from and hide the lifelines */
    useEffect(() => {
        setSeconds(timerInitSeconds);
        dispatch({ type: 'toggleLifeLineClickable' });
    }, []);

    /* Countdown the timer, once it falls below 0, the game is over */
    useEffect(() => {
        if (seconds < 0) {
            // game is over, hide the timer, advance gameState
            batch(() => {
                dispatch({ type: 'toggleTimerVisible' });
                dispatch({ type: 'advanceGameState' });
            })
          return;
        }
    
        const timer = setTimeout(() => {
            setSeconds(seconds - 1);
        }, 1000);
    
        return () => clearTimeout(timer);
      }, [seconds]);

    return (
        <div className='timer show-timer'>
            <span className='timer-text-anim'>{seconds}</span>
        </div>
    );
}

export default Timer;