import background from '../answer-box.svg';
import './answer.css';

function Answer(props) {
    let cN = 'answer-text ' + props.bgColor;
    console.log(cN);

    return (
        <div className='answer' onClick={() => props.selectAnswer()}>
            <img src={background} alt='answer'/>
            <div className={cN}>
                <span>{props.letter}</span><p>{props.answer}</p>
            </div>
        </div>
    );
}

export default Answer;