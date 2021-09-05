import './PhoneAFriendModal.css';
import phoneafriend from '../phoneafriend.png';
import Friend from './Friend';
import { useEffect, useState } from 'react';

const PhoneAFriendModal = (props) => {

    const [activeFriend, setActiveFriend] = useState(0);
    const [buttonText, setButtonText] = useState('Call');
    const [isPhoneAFriendModalHidden, setIsPhoneAFriendModalHidden] = useState(false);
    const [callTimeLeft, setCallTimeLeft] = useState(10);
    const [suggestion, setSuggestion] = useState('');
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [visibleFriends, setVisibleFriends] = useState(true);
    const [friendAnswer, setFriendAnswer] = useState('');

    useEffect(() => {
        if (isPhoneAFriendModalHidden) {
            const myTimer = setTimeout(() => {
                props.changeViewPhoneAFriendModal();
                clearTimeout(myTimer);
            }, 500);
        }
    }, [isPhoneAFriendModalHidden]);

    useEffect(() => {
        const callTimer = setTimeout(() => {
            if(callTimeLeft <= 0) {
                props.changeViewPhoneAFriendModal();
                props.changeTimerInitSeconds(15);
                props.changeTimerVisible();
            }
            setCallTimeLeft(callTimeLeft - 1);
            clearTimeout(callTimer);
        }, 1000);

        return () => clearTimeout(callTimer);
    }, [callTimeLeft]);

    useEffect(() => {
        // when suggestion changes, show what answer the friend chooses
        const answers = [props.answers.answer_1, props.answers.answer_2, props.answers.answer_3, props.answers.answer_4];
        const letterAnswer = ['A: ', 'B: ', 'C: ', 'D: '];
        setFriendAnswer(`${letterAnswer[suggestion]} ${answers[suggestion]}`);

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

    const listFriends = props.friends.map((e, idx) => <Friend friendIsVisible={visibleFriends} activeFriend={activeFriend} changeFriend={changeFriend} key={idx} friendNum={idx} name={e.name} twitter_id={e.twitter_id} />);

    const btnCall = () => {
        // randomly pick one of the remaining answers

        if(buttonText.search('Call') === 0) {
            setSuggestion(props.changePhoneAFriendSuggestion());

            setVisibleFriends(false);
        }
        else {
            props.changeTimerInitSeconds(15);
            props.changeTimerVisible();
            props.changeViewPhoneAFriendModal();
        }
        
    };

    function changeFriend(key) {
        setActiveFriend(key);
    }

    useEffect(() => {
        setButtonText(`Call ${props.friends[activeFriend].name}`);
    }, [activeFriend]);

    useEffect(() => {
        props.changeTimerVisible();
        props.changeLifeLineClickable();
    }, []);

    return (
        <div className={`phone-a-friend-modal__container ${isPhoneAFriendModalHidden ? 'hide-modal' : 'show-modal'}`}>
            <div className='phone-a-friend-modal__inner'>
                <img className='lifeline-image' src={phoneafriend} alt="modal__image" />
                {showSuggestion ? null : <div className='friend-container'>{listFriends}</div>}
                {showSuggestion ? <div className='friend-grid'><Friend friendIsVisible={true} name={props.friends[activeFriend].name} twitter_id={props.friends[activeFriend].twitter_id} /><div className='suggestion-box'>{friendAnswer}</div></div> : null}
                <div className='btn-call-name' onClick={btnCall}>{buttonText} - {callTimeLeft}</div>
            </div>
        </div>
    )
};

export default PhoneAFriendModal;