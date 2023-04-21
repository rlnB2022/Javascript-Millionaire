import '../styles/LifeLineModal.css';

/* import the lifeline images */
import fiftyfifty from '../fiftyfifty.png';
import phoneafriend from '../phoneafriend.png';
import asktheaudience from '../asktheaudience.png';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';

const LifeLineModal = () => {

    const imgs = [fiftyfifty, phoneafriend, asktheaudience];
    const lifelineName = ['50:50', 'Phone A Friend', 'Ask the Audience'];
    const [isHidden, setIsHidden] = useState(false);
    const lifeLineImageIndex = useSelector(state => state.lifeLineImageIndex);

    const dispatch = useDispatch();

    const handleClickNo = () => {
        hideModal();
    };

    const handleClickYes = () => {
        hideModal();
    };

    const hideModal = () => {
        setIsHidden(true);
        const modalTimeout = setTimeout(() => {
            dispatch({ type: 'toggleViewLifeLineModal' });
        }, 500);
    };

    // const useLifeLine = (index) => {

    //     if (index === 0) {
    //       // 50:50 lifeline used
    //       const cor = questions[currentLevel].answer_correct - 1;
    
    //       // fix array so that only incorrect answer indexes are included
    //       const incorrectAnswers = [0, 1, 2, 3];
    //       incorrectAnswers.splice(cor, 1);
    
    //       // randomly choose one of these arrays to stay
    //       const chosenNumber = Math.floor(Math.random() * incorrectAnswers.length);
    
    //       // remove chosenNumber from array leaving only answers that should be hidden
    //       incorrectAnswers.splice(chosenNumber, 1);
    
    //       // get all elements with .lifeline
    //       const answerElems = document.querySelectorAll('.answer');
    //       answerElems[incorrectAnswers[0]].classList.add('hide-answer');
    //       answerElems[incorrectAnswers[1]].classList.add('hide-answer');
    //       answerElems[incorrectAnswers[0]].classList.remove('answer-visible');
    //       answerElems[incorrectAnswers[1]].classList.remove('answer-visible');
    
    //       // disable 50:50 lifeline
    //       dispatch({ type: 'setLifeLineFiftyFifty', amount: 0 });
    //     }
    //     else if (index === 1) {
    //       // Phone A Friend lifeline used
    //       batch(() => {
    //           dispatch({ type: 'toggleViewPhoneAFriendModal' });    
    //           dispatch({ type: 'setLifeLinePhoneAFriend', amount: 0 });
    //       });
    //     }
    //     else {
    //       // Ask The Audience lifeline used
    //       batch(() => {
    //           dispatch({ type: 'toggleViewAskTheAudienceModal' });
    //           dispatch({ type: 'setLifeLineAskTheAudience', amount: 0 });
    //       });
    //     }
    //   }

    return (
        <div className={`lifeline__modal--container ${isHidden ? 'hide-modal' : 'show-modal'}`}>
            <div className='lifeline__modal'>
                <img src={imgs[lifeLineImageIndex]} alt="modal__image" />
                <p>Are you sure you want to use your {lifelineName[lifeLineImageIndex]} lifeline?</p>
                <div className='lifeline__modal--options'>
                    <div className='lifeline__button lifeline__modal--option-no' onClick={handleClickNo}>No</div>
                    <div className='lifeline__button lifeline__modal--option-yes' onClick={handleClickYes}>Yes</div>
                </div>
            </div>
        </div>
    )
}

export default LifeLineModal;