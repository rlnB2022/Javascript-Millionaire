import '../styles/currentmoney.css';
import { useSelector } from 'react-redux';

const CurrentMoney = () => {
    const moneyLevel = useSelector(state => state.moneyLevel);
    return (
        <div className='current-money'>
            <p>{moneyLevel}</p>
        </div>
    );
}

export default CurrentMoney;