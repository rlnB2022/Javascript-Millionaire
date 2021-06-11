import './question.css';
import background from '../answer-bg.png';

function Question(props) {
    return (
        <div className='question'>
            <img src={background} alt="question"/>
            <p>{props.question}</p>
        </div>
    );
}

export default Question;