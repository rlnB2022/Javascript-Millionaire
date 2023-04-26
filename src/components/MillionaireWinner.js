import '../styles/MillionaireWinner.css';
import firebase from '../firebase';
import { useState } from 'react';

const MillionaireWinner = ({homeScreen}) => {
    const [winnerName, setWinnerName] = useState('Anonymous Winner');

    // submit button
    const handleClick = () => {
        // get today's date
        const d = new Date();
        const newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    
        // store name in the firebase database
        const res = firebase.firestore().collection('winners').add({ name: winnerName, date: newDate });
    
        // back to the home screen
        homeScreen();
    };

    return (
        <div className='millionaire-winner'>
            <div className='millionaire-winner-container'>
                <h1 className='congrats'>Congratulations!</h1>
                <h2 className='latest-millionaire'>You are the newest Javascript Millionaire!</h2>
                <p className='disclaimer'>Disclaimer: You will not be given any real money. This was just for fun. I hope you enjoyed yourself!</p>
                <p className='enter-your-name'>Enter your name below to be placed on the Recent Winners list!</p>
                <input 
                    className='name-input' 
                    id='user-name-input' 
                    name='winner-name' 
                    onChange={event => setWinnerName(event.target.value)} 
                    onFocus={event => event.target.select()}
                    type='text' 
                    value={winnerName} />
                <button className='submit-name' disabled={!winnerName.length} onClick={handleClick}>Submit</button>
            </div>
        </div>
    )
};

export default MillionaireWinner;