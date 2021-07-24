import background1 from '../answer-box.svg';
import background2 from '../answer-box_selected.svg';
import { useEffect } from 'react';
import './answer.css';

function Answer(props) {

    useEffect(() => {
        const txtInterval = setInterval(function () {
            clearInterval(txtInterval);
            props.answerStateFlag();
        }, 25);
    }, []);

    let background;
    let answer_selected_color = {
        color: '#fff'
    };

    if (props.bgColor === 'orange') {
        background = background2;
        answer_selected_color = { color: '#000' };
    }
    else {
        background = background1;
    }

    return (
        <div className='answer answer-visible-0' onClick={() => props.changeAnswerSelected(props.answerIndex)}>
            <img src={background} alt='answer' />
            <div className='answer-text'>
                <span style={answer_selected_color}>{props.letter}</span><p style={answer_selected_color}>{props.answer}</p>
            </div>
        </div>
    )

    // if(props.answerIndex === 0) {
    //     return (
    //         <div className='answer answer-visible-0' onClick={() => props.selectAnswer()}>
    //             <img src={background} alt='answer'/>
    //             <div className='answer-text'>
    //                 <span style={answer_selected_color}>{props.letter}</span><p style={answer_selected_color}>{props.answer}</p>
    //             </div>
    //         </div>
    //     );
    // }
    // else if(props.answerIndex === 1) {
    //     return (
    //         <div className='answer answer-visible-1' onClick={() => props.selectAnswer()}>
    //             <img src={background} alt='answer'/>
    //             <div className='answer-text'>
    //                 <span style={answer_selected_color}>{props.letter}</span><p style={answer_selected_color}>{props.answer}</p>
    //             </div>
    //         </div>
    //     );
    // }
    // else if(props.answerIndex === 2) {
    //     return (
    //         <div className='answer answer-visible-2' onClick={() => props.selectAnswer()}>
    //             <img src={background} alt='answer'/>
    //             <div className='answer-text'>
    //                 <span style={answer_selected_color}>{props.letter}</span><p style={answer_selected_color}>{props.answer}</p>
    //             </div>
    //         </div>
    //     );
    // }

    // return (
    //     <div className='answer answer-visible-3' onClick={() => props.selectAnswer()}>
    //         <img src={background} alt='answer'/>
    //         <div className='answer-text'>
    //             <span style={answer_selected_color}>{props.letter}</span><p style={answer_selected_color}>{props.answer}</p>
    //         </div>
    //     </div>
    // );

}

export default Answer;