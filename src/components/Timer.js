import './timer.css';
import { useEffect } from 'react';

function Timer(props) {

    useEffect(() => {
        if(props.timerSeconds < 0) {
            const timerElem = document.querySelector('.timer');
            const timerText = document.querySelector('.timer span');

            timerText.classList.add('hide-timer-text');
            timerElem.classList.add('hide-timer');

            return;
        }

        const timer = setTimeout(() => {
            props.changeTimerSeconds(props.timerSeconds - 1);
        },1000);

        return () => clearTimeout(timer);
    },[props.timerSeconds]);

    return (
        <div className='timer' onAnimationStart={props.initTimer}>
            <span>{props.timerSeconds}</span>
        </div>
    );
}

export default Timer;