import '../styles/lifelinepopups.css';
import Timer from './Timer';
import CurrentMoney from './CurrentMoney';
import { useSelector } from 'react-redux';

const LifeLinePopUps = () => {
    const timerVisible = useSelector(state => state.timerVisible);

    return (
        <div className="lifeline-popups">
            {timerVisible && <Timer/>}
            <CurrentMoney />
        </div>
    )
}

export default LifeLinePopUps;