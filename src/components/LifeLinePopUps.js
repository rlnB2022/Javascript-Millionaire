import "../styles/lifelinepopups.css";
import Timer from "./Timer";
import CurrentMoney from "./CurrentMoney";

const LifeLinePopUps = () => {
	return (
		<div className="lifeline-popups">
			<Timer />
			<CurrentMoney />
		</div>
	);
};

export default LifeLinePopUps;
