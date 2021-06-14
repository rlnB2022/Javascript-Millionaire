import './question.css';
import background from '../answer-box.svg';

function Question(props) {
    return (
        <div className='question' key={props.questionID}>
            <p>{props.question}</p>
        </div>
    );
}

export default Question;