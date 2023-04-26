import '../styles/stats.css';

const Stats = ({gamesPlayed}) => {

    return (
        <div className="stats">
            <h2 className='games-played'>Total Games Played: {gamesPlayed}</h2>
        </div>
    )
}

export default Stats;