import '../styles/startgame.css';
import imgTitle from '../logo.png';
import UserActions from './UserActions';
import { useState } from 'react';

const StartGame = ({startGame}) => {

    const [isVisible, setIsVisible] = useState(true);

    const handleClick = () => {
        setIsVisible(false);

        // give the animation time before starting the game
        setTimeout(() => {
            startGame();
        }, 500);
    };

    return (
        <div className={`start-game ${isVisible ? '' : 'fade-out-start-game'}`}>
            <img className='title-img' src={imgTitle} alt="title" />
            <div className='start-game-bottom'>
                <UserActions />
                <button className='start-game-button' onClick={handleClick}>START GAME</button>
                <p className="created-by">Created by Rick Beyer</p>
            </div>
        </div>
    );
}

export default StartGame;