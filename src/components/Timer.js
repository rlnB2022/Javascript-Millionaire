import './timer.css';
import { useEffect } from 'react';

const Timer = (props) => {

    useEffect(() => {
        const timerText = document.querySelector('.timer span');
        const timer = document.querySelector('.timer');
        timer.classList.add('show-timer');
        timerText.classList.add('timer-text-anim');
        props.initTimer(30);
    }, []);

    // useEffect(() => {
    //     timerText.classList.add('show-timer');
    // },[timerSeconds]);

    return (
        <div className='timer'>
            <span>{props.timerSeconds}</span>
        </div>
    );
}

export default Timer;