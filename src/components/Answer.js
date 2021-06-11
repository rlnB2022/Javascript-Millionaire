import background from '../answer-bg.png';
import './answer.css';

function Answer(props) {
    return (
        <div className='answer'>
            <img src={background} alt='answer'/>
            <div className='answer-text'>
                <span>{props.letter}</span><p>{props.answer}</p>
            </div>
        </div>
    );
}

export default Answer;