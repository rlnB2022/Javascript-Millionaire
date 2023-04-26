import '../styles/gameover.css';

const GameOver = ({homeScreen, level}) => {
    return (
        <div className="game-over">
            <p className='game-over-title'>GAME OVER</p>
            <p className='game-over-message'>The highest money level you reached was {level}!</p>
            <div className='game-over-button' onClick={homeScreen}>
                Home
            </div>
        </div>
    )
}

export default GameOver;