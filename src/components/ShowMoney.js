import './showmoney.css';
import { useEffect } from 'react';

const ShowMoney = (props) => {

    useEffect(() => {
        const txtInterval = setInterval(function() {
            clearInterval(txtInterval);
            props.changeGameState();
        },2000);
    },[]);

    return (
        <div className="money">
            <p className="show-money">{props.money}</p>
        </div>
    )
}

export default ShowMoney;