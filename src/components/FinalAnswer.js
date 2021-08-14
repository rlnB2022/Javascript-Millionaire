import './FinalAnswer.css';

const FinalAnswer = (props) => {

    let answers = [props.answers.answer_1, props.answers.answer_2, props.answers.answer_3, props.answers.answer_4];

    return (
        <div className='final-answer-container'>
            <div className='bg-image'>
                <p className='final-answer-header'>Final Answer?</p>
            </div>
            <div>
                {answers[props.answerSelected]}
            </div>
            <div className='final-answer-no' onClick={() => props.changeVisible()}>
                <p>No</p>
            </div>
            <div className='final-answer-yes' onClick={() => props.isAnswerCorrect(props.answerSelected + 1)}>
                <p>Yes</p>
            </div>
        </div >
    )
}

export default FinalAnswer;