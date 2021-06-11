import './lifelinepopups.css';
import AskTheAudiencePopUp from './AskTheAudiencePopUp';
import Timer from './Timer';
import CurrentMoney from './CurrentMoney';


function LifeLinePopUps(props) {
    return (
        <div className="lifeline-popups">
            <AskTheAudiencePopUp />
            <Timer />
            <CurrentMoney amount={props.current_money}/>
        </div>
    )
}

export default LifeLinePopUps;