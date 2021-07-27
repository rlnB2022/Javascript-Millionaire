import './answerpopup.css';

const AnswerPopup = (props) => {
    const styles = {
        transition: '.25s ease-in-out'
    }

    let answers = [props.answers.answer_1, props.answers.answer_2, props.answers.answer_3, props.answers.answer_4];

    return (
        <div className='answer-popup' style={{...styles, opacity: props.op, transform: 'scale(' + props.sc + ')'}}>
            <div className="answer-popup__message answer-popup__padding">{props.correctAnswerText}</div>
            <div className="answer-popup__correct answer-popup__padding">{answers[props.correctAnswer-1]}</div>
            <div className="answer-popup__button answer-popup__padding">{props.answer_popup_button}</div>
        </div>
    )
}

export default AnswerPopup;