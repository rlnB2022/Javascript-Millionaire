import '../styles/question.css';
import { useEffect } from 'react';

const Question = (props) => {

    useEffect(() => {
        const txtInterval = setInterval(function () {
            clearInterval(txtInterval);
            props.mainStateFlag();
        }, 1000);
    }, []);

    const newQuestion = props.answers.question.replace(/\\n/g, "\n");

    return (
        <div className='question-container'>
            <div className='question'>
                <p>{newQuestion}</p>
            </div>
        </div>
    );
}

export default Question;