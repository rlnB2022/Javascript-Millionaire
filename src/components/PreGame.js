import './pregame.css';
import { useEffect } from 'react';

const PreGame = (props) => {

    useEffect(() => {
        const txtInterval = setInterval(function() {
            clearInterval(txtInterval);
            props.changeGameState();
        },2000);
    },[]);

    return (
        <div className='pregame'>
            <p className='pregame-text'>GET READY!</p>
        </div>
    );
}

export default PreGame;