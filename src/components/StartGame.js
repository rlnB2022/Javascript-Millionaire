import { React } from 'react';
import './startgame.css';

function StartGame(props) {
    return (
        <div className='start-game'>
            <button onClick={() => props.gameOverFlag()}>Start Game</button>
        </div>
    );
}

export default StartGame;