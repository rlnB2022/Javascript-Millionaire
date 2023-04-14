import '../styles/stats.css';

const Stats = (props) => {

    return (
        <div className="stats">
            <h2 className='games-played'>Total Games Played: {props.gamesPlayed}</h2>
        </div>
    )
}

export default Stats;