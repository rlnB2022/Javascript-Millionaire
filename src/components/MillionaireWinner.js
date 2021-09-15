import './MillionaireWinner.css';
import { useState } from 'react';

const MillionaireWinner = () => {
    // input element
    const [thisUserName, setThisUserName] = useState('Player');

    // update input element value
    const changeUserName = (e) => {
        setThisUserName(e.target.value);
    };

    // select all text in input field
    const handleFocus = (e) => {
        e.target.select();
    };

    // submit button
    const handleClick = () => {
        
    };
    
    return (
        <div className='millionaire-winner'>
            <div className='millionaire-winner-container'>
                <h1 className='congrats'>Congratulations!</h1>
                <h2 className='latest-millionaire'>You are the latest Javascript Millionaire!</h2>
                <p className='disclaimer'>Disclaimer: You will not be given any real money. This was just for fun. I hope you enjoyed yourself!</p>
                <p className='enter-your-name'>Enter your name below to be placed on the Recent Winners list!</p>
                <input className='name-input' id='user-name-input' type='text' name='winner-name' onChange={changeUserName} value={thisUserName} onFocus={handleFocus}/>
                <div className='submit-name' onClick={handleClick}>Submit</div>
            </div>
        </div>
    )
};

export default MillionaireWinner;