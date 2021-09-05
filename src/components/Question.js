import './question.css';
import { useEffect } from 'react';

const Question = (props) => {
    useEffect(() => {
        const txtInterval = setInterval(function () {
            clearInterval(txtInterval);
            props.mainStateFlag();
        }, 1000);
    }, []);

    const newQuestion = props.answers.question.replace(/\n/g, "<br />");
    console.log(newQuestion);

    return (
        <div className='question-container'>
            <div className='question'>
                <p dangerouslySetInnerHTML={{__html:newQuestion}}></p>
            </div>
        </div>
    );
}

export default Question;