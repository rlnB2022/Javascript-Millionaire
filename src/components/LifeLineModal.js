import '../styles/LifeLineModal.css';

/* import the lifeline images */
import fiftyfifty from '../fiftyfifty.png';
import phoneafriend from '../phoneafriend.png';
import asktheaudience from '../asktheaudience.png';

import { useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';

const LifeLineModal = () => {

    const imgs = [fiftyfifty, phoneafriend, asktheaudience];
    const lifelineName = ['50:50', 'Phone A Friend', 'Ask the Audience'];

    /* Using local state to show/hide the modal - which adds a class using animation */
    const [isHidden, setIsHidden] = useState(false);

    const lifeLineIndex = useSelector(state => state.lifeLineIndex);
    const currentLevel = useSelector(state => state.currentLevel);
    const questions = useSelector(state => state.questions);

    const dispatch = useDispatch();

    /* The user clicked no, only toggle the lifeline modal */
    const handleClickNo = () => {
        dispatch({ type: 'toggleViewLifeLineModal' });
    };

    /* The user clicked yes, hide the modal and handle the lifeline effects */
    const handleClickYes = () => {
        setIsHidden(true);
        
        if (lifeLineIndex === 0) {
            // 50:50 lifeline

            // get the correctAnswer index
            const correctAnswer = questions[currentLevel].answer_correct - 1;
      
            // fix array so that only incorrect answer indexes are included
            const incorrectAnswers = [0, 1, 2, 3];
            incorrectAnswers.splice(correctAnswer, 1);
      
            // randomly choose one of these answers to stay
            const chosenNumber = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
            console.log('chosenNumber', chosenNumber);
      
            // remove chosenNumber from array leaving only answers that should be hidden
            incorrectAnswers.splice(chosenNumber, 1);
            console.log('incorrectAnswers', incorrectAnswers);

            console.log([correctAnswer, chosenNumber]);

            dispatch({ type: 'visibleAnswers', visibleAnswers: [correctAnswer, chosenNumber]});

            // disable 50:50 lifeline
            dispatch({ type: 'setLifeLineFiftyFifty', amount: 0 });
          }
          else if (lifeLineIndex === 1) {
            // Phone A Friend lifeline
            batch(() => {
                dispatch({ type: 'toggleViewPhoneAFriendModal' });
                // disable phone a friend lifeline
                dispatch({ type: 'setLifeLinePhoneAFriend', amount: 0 });
            });
          }
          else {
            // Ask The Audience lifeline
            batch(() => {
                dispatch({ type: 'toggleViewAskTheAudienceModal' });
                // disable ask the audience lifeline
                dispatch({ type: 'setLifeLineAskTheAudience', amount: 0 });
            });
          }
        
        setTimeout(() => {
            dispatch({ type: 'toggleViewLifeLineModal' });
        }, 500);
    };

    return (
        <div className={`lifeline__modal--container ${isHidden ? 'hide-modal' : 'show-modal'}`}>
            <div className='lifeline__modal'>
                <img src={imgs[lifeLineIndex]} alt="modal__image" />
                <p>Are you sure you want to use your {lifelineName[lifeLineIndex]} lifeline?</p>
                <div className='lifeline__modal--options'>
                    <div className='lifeline__button lifeline__modal--option-no' onClick={handleClickNo}>No</div>
                    <div className='lifeline__button lifeline__modal--option-yes' onClick={handleClickYes}>Yes</div>
                </div>
            </div>
        </div>
    )
}

export default LifeLineModal;