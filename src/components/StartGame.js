import '../styles/startgame.css';
import imgTitle from '../logo.png';
import UserActions from './UserActions';
import { useState } from 'react';
import { storeGamePlayed } from '../utils/utils';
import { useDispatch, batch } from 'react-redux';

const StartGame = () => {

    /* When the user clicks the Start button, set this to false so the fade out class will apply */
    const [isVisible, setIsVisible] = useState(true);
    const dispatch = useDispatch();

    /* Start the game and store a game played! */
    const handleClick = () => {
        setIsVisible(false);

        // give the animation time before starting the game
        setTimeout(() => {
            batch(() => {
            //   dispatch({ type: 'updateSideBar' });
              dispatch({ type: 'changeTimerInitSeconds', amount: 30});
              dispatch({ type: 'advanceGameState' });
            })
        }, 500);
    
        // record game played in database
        storeGamePlayed();
      }

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
