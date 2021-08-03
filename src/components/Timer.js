import './timer.css';
import { useState, useEffect } from 'react';

const Timer = (props) => {

    let [seconds, setSeconds] = useState(0);
    // let [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        if(props.timerVisible) {
            const timerText = document.querySelector('.timer span');
            const timer = document.querySelector('.timer');
            timer.classList.add('show-timer');
            timerText.classList.add('timer-text-anim');
        }
        else {

        }
    }, [props.timerVisible]);

    useEffect(() => {
        setSeconds(props.timerInitSeconds);
        // start the timer
        // setTimerActive(true);
    },[props.timerInitSeconds]);

    useEffect(() => {
        if (seconds < 0) {
          props.changeTimerVisible(false);
          props.changeGameState();
          return;
        }
    
        const timer = setTimeout(() => {
            setSeconds(seconds - 1);
          }, 1000);
    
        return () => clearTimeout(timer);
      }, [seconds]);

    return (
        <div className='timer'>
            <span>{seconds}</span>
        </div>
    );
}

export default Timer;