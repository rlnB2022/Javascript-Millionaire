import './stats.css';

const Stats = (props) => {

    return (
        <div className="stats">
            <h2>Total Games Played: {props.gamesPlayed}</h2>
        </div>
    )
}

export default Stats;