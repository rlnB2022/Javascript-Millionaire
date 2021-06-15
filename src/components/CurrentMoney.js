import './currentmoney.css';
import background from '../answer-box.svg';

function CurrentMoney(props) {
    return (
        // <div className='current-money' style={{ backgroundImage: `url(${background})` }}>
        <div className='current-money'>
            <img src={background} alt='current money' />
            <p>{props.amount}</p>
        </div>
    );
}

export default CurrentMoney;