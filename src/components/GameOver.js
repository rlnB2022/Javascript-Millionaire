import '../styles/gameover.css';

const GameOver = (props) => {
    return (
        <div className="game-over">
            <p className='game-over-title'>GAME OVER</p>
            <p className='game-over-message'>The highest money level you reached was {props.level}!</p>
            <div className='game-over-button' onClick={props.homeScreen}>
                Home
            </div>
        </div>
    )
}

export default GameOver;