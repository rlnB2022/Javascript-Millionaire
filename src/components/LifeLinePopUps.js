import './lifelinepopups.css';
import Timer from './Timer';
import CurrentMoney from './CurrentMoney';
import { useEffect } from 'react';

const LifeLinePopUps = (props) => {

    useEffect(() => {
        const txtInterval = setInterval(function () {
            clearInterval(txtInterval);
            props.mainStateFlag();
            const moneyElem = document.querySelector('.question');
            moneyElem.classList.add('show-question');
        }, 1000);
    }, []);

    return (
        <div className="lifeline-popups">
            {props.timerVisible ? <Timer
                changeLifeLineAvailable={props.changeLifeLineAvailable}
                changeTimerVisible={props.changeTimerVisible}
                timerVisible={props.timerVisible}
                timerInitSeconds={props.timerInitSeconds}
                changeGameState={props.changeGameState}
                /> : <div></div>}
            <CurrentMoney amount={props.current_money} />
        </div>
    )
}

export default LifeLinePopUps;