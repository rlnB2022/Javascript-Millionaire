import background from '../answer-bg.png';
import './answer.css';

function Answer() {
    return (
        <div className='answer'>
            <img src={background} alt='answer'/>
            <div className='answer-text'>
                <span>A:</span><p>The answer to the question is not what you think.</p>
            </div>
        </div>
    );
}

export default Answer;