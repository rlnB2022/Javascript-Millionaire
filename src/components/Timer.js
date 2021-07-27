import './timer.css';
import { useEffect } from 'react';

const Timer = (props) => {

    useEffect(() => {
        props.changeTimerSeconds(30);
    }, [props.timerVisible]);

    return (
        <div className='timer' onAnimationStart={props.initTimer}>
            <span>{props.timerSeconds}</span>
        </div>
    );
}

export default Timer;