import '../styles/finalanswer.css';

const FinalAnswer = (props) => {

    const answers = [props.answers.answer_1, props.answers.answer_2, props.answers.answer_3, props.answers.answer_4];

    return (
        <div className='final-answer-outer'>
            <div className='final-answer-container'>
                <div className='bg-image'>
                    <p className='final-answer-header'>Final Answer?</p>
                </div>
                <div className='final-answer-selected'>
                    {answers[props.answerSelected]}
                </div>
                <div className='final-answer-buttons'>
                    <div className='final-answer-btn final-answer-no' onClick={() => props.changeVisible()}>
                        <p>No</p>
                    </div>
                    <div className='final-answer-btn final-answer-yes' onClick={() => props.isAnswerCorrect(props.answerSelected + 1)}>
                        <p>Yes</p>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default FinalAnswer;