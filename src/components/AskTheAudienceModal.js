import '../styles/AskTheAudienceModal.css';
import asktheaudience from '../asktheaudience.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AskTheAudienceModal = (props) => {
    const dispatch = useDispatch();
    
    const visibleAnswers = useSelector(state => state.visibleAnswers);
    const [arrPct, setArrPct] = useState([100, 100, 100, 100]);

    useEffect(() => {
        // Get total number of answers
        const arrUserAnswers = [props.answer.user_selected_1, props.answer.user_selected_2, props.answer.user_selected_3, props.answer.user_selected_4];
        const total = arrUserAnswers.reduce((a, b) => a + b);

        // get perentages of each answer
        const pctAnswerOne = Math.round((props.answer.user_selected_1 / total) * 100) || 0;
        const pctAnswerTwo = Math.round((props.answer.user_selected_2 / total) * 100) || 0;
        const pctAnswerThree = Math.round((props.answer.user_selected_3 / total) * 100) || 0;
        const pctAnswerFour = 100 - pctAnswerOne - pctAnswerTwo - pctAnswerThree || 0;
        
        // store percentages in an array
        let pct = [100 - pctAnswerOne, 100 - pctAnswerTwo, 100 - pctAnswerThree, 100 - pctAnswerFour];

        // show user answer percentages for answers that remain on screen
        // if user used the 50:50 lifeline, there should only be two answers showing
        // By setting the percentage to 100, that means 0% of the bar graph will display
        pct.forEach((el, idx) => {
            if(!visibleAnswers.includes(idx)) {
                pct[idx] = 100;
            }
        });

        // wait for Modal to mount, then animate bars
        const audienceTimeout = setTimeout(() => {
            clearTimeout(audienceTimeout);

            setArrPct([...pct]);

            /* Cleanup: Clear the timeout  */
            return () => clearTimeout(audienceTimeout);
        }, 500);
    }, []);

    /* Hide the modal when the user clicks the OK button */
    const handleClick = () => {
        dispatch({ type: 'toggleViewAskTheAudienceModal' });
    };

    return (
        <div className='ask-the-audience-container'>
            <div className='ask-the-audience-modal'>
                <div className='ask-the-audience-modal__inner'>
                    <div className='ask-the-audience-modal__percentages'>
                        <div className='ask-the-audience-modal__grid-item'>{arrPct[0]}%</div>
                        <div className='ask-the-audience-modal__grid-item'>{arrPct[1]}%</div>
                        <div className='ask-the-audience-modal__grid-item'>{arrPct[2]}%</div>
                        <div className='ask-the-audience-modal__grid-item'>{arrPct[3]}%</div>
                    </div>
                    <img src={asktheaudience} alt="modal__image" />
                    <div className='percentage-columns'>
                        <div className='percentage-column'>
                            <div style={{ transform: 'translateY(' + arrPct[0] + '%)'}} className='answer-percentage answer-percentage_1'></div>
                        </div>
                        <div className='percentage-column'>
                            <div style={{ transform: 'translateY(' + arrPct[1] + '%)'}} className='answer-percentage answer-percentage_2'></div>
                        </div>
                        <div className='percentage-column'>
                            <div style={{ transform: 'translateY(' + arrPct[2] + '%)'}} className='answer-percentage answer-percentage_3'></div>
                        </div>
                        <div className='percentage-column'>
                            <div style={{ transform: 'translateY(' + arrPct[3] + '%)'}} className='answer-percentage answer-percentage_4'></div>
                        </div>
                    </div>
                    <div className='ask-the-audience-modal__letters'>
                        <div className='ask-the-audience-modal__grid-item'>A</div>
                        <div className='ask-the-audience-modal__grid-item'>B</div>
                        <div className='ask-the-audience-modal__grid-item'>C</div>
                        <div className='ask-the-audience-modal__grid-item'>D</div>
                    </div>
                    <div className='ask-the-audience-modal__ok-button-container'>
                        <div className='ask-the-audience-modal__ok-button' onClick={handleClick}>OK</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AskTheAudienceModal;