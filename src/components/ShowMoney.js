import '../styles/showmoney.css';
import { useEffect } from 'react';

const ShowMoney = ({changeGameState, money}) => {

    /* When this component loads, show the money text, then delay for 2 seconds, and change the game state */
    useEffect(() => {
        const txtInterval = setInterval(function() {
            clearInterval(txtInterval);
            changeGameState();
        },2000);
    },[]);

    return (
        <div className="money">
            <p className="show-money">{money}</p>
        </div>
    )
}

export default ShowMoney;