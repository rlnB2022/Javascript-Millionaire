import './AskTheAudienceModal.css';
import asktheaudience from '../asktheaudience.png';

const AskTheAudienceModal = (props) => {

    const arrPct = [props.answer.user_selected_1, props.answer.user_selected_2, props.answer.user_selected_3, props.answer.user_selected_4];
    const pctTotal = arrPct.reduce((a, b) => a + b);

    const pctOne = Math.round((props.answer.user_selected_1 / pctTotal) * 100) || 0;
    const pctTwo = Math.round((props.answer.user_selected_2 / pctTotal) * 100) || 0;
    const pctThree = Math.round((props.answer.user_selected_3 / pctTotal) * 100) || 0;
    const pctFour = 100 - pctOne - pctTwo - pctThree || 0;

    const pct = [100 - pctOne, 100 - pctTwo, 100 - pctThree, 100 - pctFour];

    // set bars to percentage
    const pctBars = document.querySelectorAll('.answer-percentage');
    
    pctBars.forEach((e, index) => {
        e.style.transform = 'translateY(' + pct[index] + '%)';
    });

    return (
        <div className='ask-the-audience-modal'>
            <div className='ask-the-audience-modal__inner'>
                <div className='ask-the-audience-modal__percentages'>
                    <div className='ask-the-audience-modal__grid-item'>{pctOne}%</div>
                    <div className='ask-the-audience-modal__grid-item'>{pctTwo}%</div>
                    <div className='ask-the-audience-modal__grid-item'>{pctThree}%</div>
                    <div className='ask-the-audience-modal__grid-item'>{pctFour}%</div>
                </div>
                <img src={asktheaudience} alt="modal__image" />
                <div className='percentage-columns'>
                    <div className='percentage-column'>
                        <div className='answer-percentage answer-percentage_1'></div>
                    </div>
                    <div className='percentage-column'>
                        <div className='answer-percentage answer-percentage_2'></div>
                    </div>
                    <div className='percentage-column'>
                        <div className='answer-percentage answer-percentage_3'></div>
                    </div>
                    <div className='percentage-column'>
                        <div className='answer-percentage answer-percentage_4'></div>
                    </div>
                </div>
                <div className='ask-the-audience-modal__letters'>
                    <div className='ask-the-audience-modal__grid-item'>A</div>
                    <div className='ask-the-audience-modal__grid-item'>B</div>
                    <div className='ask-the-audience-modal__grid-item'>C</div>
                    <div className='ask-the-audience-modal__grid-item'>D</div>
                </div>
            </div>

        </div>
    );
}

export default AskTheAudienceModal;