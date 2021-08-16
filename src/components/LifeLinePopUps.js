import './lifelinepopups.css';
import Timer from './Timer';
import CurrentMoney from './CurrentMoney';
import { useEffect } from 'react';

const LifeLinePopUps = (props) => {

    useEffect(() => {
        const txtInterval = setInterval(function () {
            clearInterval(txtInterval);
            props.mainStateFlag();
        }, 1000);
    }, []);

    return (
        <div className="lifeline-popups">
            {props.timerVisible ? <Timer
                changeTimerVisible={props.changeTimerVisible}
                timerVisible={props.timerVisible}
                timerInitSeconds={props.timerInitSeconds}
                changeGameState={props.changeGameState}
                changeLifelineClickable={props.changeLifelineClickable}
            /> : <div></div>}
            <CurrentMoney amount={props.current_money} />
        </div>
    )
}

export default LifeLinePopUps;