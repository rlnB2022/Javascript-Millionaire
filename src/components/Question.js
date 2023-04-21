import '../styles/question.css';

const Question = (props) => {

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