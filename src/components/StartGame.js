// import { React } from 'react';
import './startgame.css';
import Winners from './Winners';
import imgTitle from '../title.png';

function StartGame(props) {
    return (
        <div className='start-game'>
            <img src={imgTitle} alt="title"/>
            <Winners />
            <button onClick={() => props.gameStateFlag()}>Start Game</button>
        </div>
    );
}

export default StartGame;