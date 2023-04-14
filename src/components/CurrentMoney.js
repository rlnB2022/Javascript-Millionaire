import '../styles/currentmoney.css';

const CurrentMoney = (props) => {
    return (
        <div className='current-money'>
            <p>{props.amount}</p>
        </div>
    );
}

export default CurrentMoney;