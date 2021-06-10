import './lifelinepopups.css';
import AskTheAudiencePopUp from './AskTheAudiencePopUp';
import Timer from './Timer';
import CurrentMoney from './CurrentMoney';


function LifeLinePopUps() {
    return (
        <div className="lifeline-popups">
            <AskTheAudiencePopUp />
            <Timer />
            <CurrentMoney />
        </div>
    )
}

export default LifeLinePopUps;