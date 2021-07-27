import './question.css';
import { useEffect } from 'react';

const Question = (props) => {
    useEffect(() => {
        const txtInterval = setInterval(function() {
            clearInterval(txtInterval);
            props.mainStateFlag();
            const moneyElem = document.querySelector('.question');
            moneyElem.classList.add('show-question');
        },2000);
    },[]);

    return (
        <div className='question' key={props.questionID}>
            <p>{props.answers.question}</p>
        </div>
    );
}

export default Question;