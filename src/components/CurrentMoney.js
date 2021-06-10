import './currentmoney.css';
import background from '../answer-bg.png';

function CurrentMoney() {
    return (
        // <div className='current-money' style={{ backgroundImage: `url(${background})` }}>
        <div className='current-money'>
            <img src={background} alt='current money' />
            <p>$1 MILLION</p>
        </div>
    );
}

export default CurrentMoney;