import './StartGame.css';
import RecentWinners from './RecentWinners';
import imgTitle from '../title.png';
import Stats from './Stats';
import ViewAllWinners from './ViewAllWinners';
import { useState } from 'react';

const StartGame = (props) => {
    
    const [startGameVisible, setStartGameVisible] = useState(true);
    const [viewAllWinnersVisible, setViewAllWinnersVisible] = useState(false);

    const showViewAllWinners = () => {
        setViewAllWinnersVisible(!viewAllWinnersVisible);
    };

    const startGameButton = () => {
        setStartGameVisible(false);
        props.startGame();
    };

    return (
        <div className={`start-game ${startGameVisible ? '' : 'fade-out-start-game'}`}>
            <img className='title-img' src={imgTitle} alt="title"/>
            <RecentWinners winners={props.winners} showViewAllWinners={showViewAllWinners}/>
            {viewAllWinnersVisible ? <ViewAllWinners showViewAllWinners={showViewAllWinners} /> : null}
            <Stats gamesPlayed={props.gamesPlayed}/>
            <button className='start-game-button' onClick={() => startGameButton()}>START GAME</button>
            <p className="created-by">Created by <a href="https://twitter.com/rick99gtp">@rick99gtp</a></p>
        </div>
    );
}

export default StartGame;