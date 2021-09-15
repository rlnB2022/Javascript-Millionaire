import './MillionaireWinner.css';

const MillionaireWinner = () => {
    return (
        <div className='millionaire-winner'>
            <div className='millionaire-winner-container'>
                <h1 className='congrats'>Congratulations!</h1>
                <h2 className='latest-millionaire'>You are the latest Javascript Millionaire!</h2>
                <p className='disclaimer'>Disclaimer: You will not be given any real money. This was just for fun. I hope you enjoyed yourself!</p>
                <p className='enter-your-name'>Enter your name below to be placed on the Recent Winners list!</p>
                <input className='name-input' type='text' name='winner-name' placeholder='Enter your name' />
                <div className='submit-name'>Submit</div>
            </div>
        </div>
    )
};

export default MillionaireWinner;