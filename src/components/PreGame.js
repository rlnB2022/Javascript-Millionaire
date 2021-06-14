import './pregame.css';
import { useEffect } from 'react';

function PreGame(props) {
    const txtArr = ['GET READY!', '3', '2', '1'];
    let count = 1;

    useEffect(() => {
        let txt = document.querySelector('.pregame-text');

        let txtInterval = setInterval(function() {
            if(count === 4) {
                clearInterval(txtInterval);
                props.gameStateFlag();
            }
            else {
                txt.innerHTML = txtArr[count];
                count++;
                // play beep sound?
            }
        },1000);
    });

    return (
        <div className='pregame'>
            <p className='pregame-text'>GET READY!</p>
        </div>
    );
}

export default PreGame;