import './StartGame.css';
import imgTitle from '../logo.png';
import ViewAllWinners from './ViewAllWinners';
import UserActions from './UserActions';
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
            <img className='title-img' src={imgTitle} alt="title" />
            <div className='start-game-bottom'>
                <UserActions showViewAllWinners={showViewAllWinners} winners={props.winners} gamesPlayed={props.gamesPlayed} />
                <button className='start-game-button' onClick={() => startGameButton()}>START GAME</button>
                <p className="created-by">Created by <a href="https://twitter.com/rick99gtp">@rick99gtp</a></p>
            </div>
            {viewAllWinnersVisible ? <ViewAllWinners winnersVisible={viewAllWinnersVisible} showViewAllWinners={showViewAllWinners} /> : null}
        </div>
    );
}

export default StartGame;