import './question.css';
import { useEffect } from 'react';

const Question = (props) => {
    useEffect(() => {
        const txtInterval = setInterval(function () {
            clearInterval(txtInterval);
            props.mainStateFlag();
        }, 1000);
    }, []);

    return (
        <div className='question-container'>
            <div className='question'>
                <p>{props.answers.question}</p>
            </div>
        </div>
    );
}

export default Question;