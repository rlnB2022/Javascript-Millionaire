import './lifelinepopups.css';
import AskTheAudiencePopUp from './AskTheAudiencePopUp';
import Timer from './Timer';
import CurrentMoney from './CurrentMoney';
import { useEffect } from 'react';

function LifeLinePopUps(props) {

    useEffect(() => {
        const txtInterval = setInterval(function() {
            clearInterval(txtInterval);
            props.mainStateFlag();
            const moneyElem = document.querySelector('.question');
            moneyElem.classList.add('show-question');
        },2000);
    },[]);

    // start timer
    useEffect(() => {
        const txtInterval = setInterval(function() {
            clearInterval(txtInterval);
            // props.mainStateFlag();
        },10000);
    },[]);

    return (
        <div className="lifeline-popups">
            <AskTheAudiencePopUp />
            <Timer />
            <CurrentMoney amount={props.current_money}/>
        </div>
    )
}

export default LifeLinePopUps;