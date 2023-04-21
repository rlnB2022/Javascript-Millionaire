import '../styles/pregame.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const ShowPreGameText = ({ text }) => {
    const dispatch = useDispatch();

    /* When this component loads, display the text, delay for 1 second1, then advance the game state */
    useEffect(() => {
        const preGameTimeout = setTimeout(() => {
            clearTimeout(preGameTimeout);
            dispatch({ type: 'advanceGameState' });
        }, 2000);
    },[]);

    return (
        <div className='pregame'>
            <p className='pregame-text'>{text}</p>
        </div>
    );
}

export default ShowPreGameText;