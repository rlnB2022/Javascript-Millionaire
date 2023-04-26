import '../styles/PhoneAFriendModal.css';
import phoneafriend from '../phoneafriend.png';
import Friend from './Friend';
import { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

const PhoneAFriendModal = ({changePhoneAFriendSuggestion}) => {

    // setup local state
    const [activeFriend, setActiveFriend] = useState(0);
    const [buttonText, setButtonText] = useState('Call');
    const [callTimeLeft, setCallTimeLeft] = useState(10);
    const [suggestion, setSuggestion] = useState('');
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [visibleFriends, setVisibleFriends] = useState(true);
    const [friendAnswer, setFriendAnswer] = useState('');

    // get global state from the store
    const questions = useSelector(state => state.questions);
    const currentLevel = useSelector(state => state.currentLevel);
    const friends = useSelector(state => state.friends);
    const answers = questions[currentLevel] ;

    const dispatch = useDispatch();

    useEffect(() => {
        const callTimer = setTimeout(() => {
            if(callTimeLeft <= 0) {
                batch(() => {
                    dispatch({ type: 'changeTimerInitSeconds', amount: 15 });
                    dispatch({ type: 'toggleTimerVisible' });
                    dispatch({ type: 'toggleViewPhoneAFriendModal' });
                })
            }
            setCallTimeLeft(callTimeLeft - 1);
            clearTimeout(callTimer);
        }, 1000);

        return () => clearTimeout(callTimer);
    }, [callTimeLeft]);

    useEffect(() => {
        // when suggestion changes, show what answer the friend chooses
        const choices = [answers.answer_1, answers.answer_2, answers.answer_3, answers.answer_4];
        const letterAnswer = ['A: ', 'B: ', 'C: ', 'D: '];
        setFriendAnswer(`${letterAnswer[suggestion]} ${choices[suggestion]}`);

        // change button text
        setButtonText('OK');
    }, [suggestion]);

    // when visibleFriends change, remove them from DOM
    useEffect(() => {
        if(!visibleFriends) {
            const friendTimer = setTimeout(() => {
                const friendElems = document.querySelectorAll('.friend-hidden');

                [...friendElems].map(e => e.style.display = 'none');

                setShowSuggestion(true);

            }, 500);

            return () => clearTimeout(friendTimer);
        }
    }, [visibleFriends]);

    const listFriends = friends.map((e, idx) => <Friend 
        friendIsVisible={visibleFriends} 
        activeFriend={activeFriend} 
        changeFriend={changeFriend} 
        key={idx} 
        friendNum={idx} 
        name={e.name} 
        twitter_id={e.twitter_id} />);

    const btnCall = () => {
        // randomly pick one of the remaining answers
        // After the user clicks the Call button, the suggestion will display
        // Then, the user will click the same button to dismiss the modal

        if(buttonText.search('Call') === 0) {
            setSuggestion(changePhoneAFriendSuggestion());

            setVisibleFriends(false);
        }
        else {
            batch(() => {
                dispatch({ type: 'changeTimerInitSeconds', amount: 15 });
                dispatch({ type: 'toggleTimerVisible' });
                dispatch({ type: 'toggleViewPhoneAFriendModal' });
            })
        }
        
    };

    /* Set the active friend */
    function changeFriend(key) {
        setActiveFriend(key);
    }

    /* When the activeFriend changes, change the button text to read the friend's name */
    useEffect(() => {
        if(friends[activeFriend] && friends[activeFriend].name) {
            setButtonText(`Call ${friends[activeFriend].name}`);
        }
        else {
            setButtonText('Make the call');
        }
    }, [activeFriend]);

    /* When the component mounts, start the local timer and disable lifelines */
    useEffect(() => {
        batch(() => {
            dispatch({ type: 'toggleTimerVisible' });
            dispatch({ type: 'toggleLifeLineClickable' });
        })
    }, []);

    return (
        <div className={`phone-a-friend-modal__container show-modal}`}>
            <div className='phone-a-friend-modal__inner'>
                <img className='lifeline-image' src={phoneafriend} alt="modal__image" />
                {showSuggestion 
                    ? null 
                    : <div className='friend-container'>{listFriends}</div>}
                {showSuggestion 
                    ? <div 
                            className='friend-grid'><Friend 
                            friendIsVisible={true} 
                            name={friends[activeFriend].name || ''} 
                            twitter_id={friends[activeFriend].twitter_id} />
                            <div className='suggestion-box'>{friendAnswer}</div>
                        </div> 
                    : null}
                <div className='btn-call-name' onClick={btnCall}>{buttonText} - {callTimeLeft}</div>
            </div>
        </div>
    )
};

export default PhoneAFriendModal;