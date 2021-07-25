import './finalanswer.css';

function FinalAnswer(props) {

    const styles = {
        transition: '.25s ease-in-out'
    }

    let answers = [props.answers.answer_1, props.answers.answer_2, props.answers.answer_3, props.answers.answer_4];

    return (
        <div className='final-answer-container' style={{ ...styles, opacity: props.op, transform: 'scale(' + props.sc + ')' }}>
            <div>
                <p>Final Answer?</p>
            </div>
            <div>
                {answers[props.answerSelected]}
            </div>
            <div className='final-answer-no' onClick={props.visible}>
                <p>No</p>
            </div>
            <div className='final-answer-yes'>
                <p>Yes</p>
            </div>
        </div >
    )
}

export default FinalAnswer;
