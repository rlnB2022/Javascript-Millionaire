import '../styles/pregame.css';
import { useEffect } from 'react';

const ShowPreGameText = ({changeGameState, text}) => {

    /* When this component loads, display the GET READY! text, delay for 2 seconds, then advance the game state */
    useEffect(() => {
        const preGameTimeout = setTimeout(() => {
            clearTimeout(preGameTimeout);
            changeGameState();
        },2000);
    },[]);

    return (
        <div className='pregame'>
            <p className='pregame-text'>{text}</p>
        </div>
    );
}

export default ShowPreGameText;