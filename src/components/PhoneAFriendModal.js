import './PhoneAFriendModal.css';
import phoneafriend from '../phoneafriend.png';
import Friend from './Friend';
import { useEffect, useState } from 'react';

const PhoneAFriendModal = (props) => {

    const [activeFriend, setActiveFriend] = useState(0);
    const [buttonText, setButtonText] = useState('Call');
    const [isPhoneAFriendModalHidden, setIsPhoneAFriendModalHidden] = useState(false);
    const [callTimeLeft, setCallTimeLeft] = useState(10);

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
            setCallTimeLeft(callTimeLeft - 1);
            clearTimeout(callTimer);
        }, 1000);

        return () => clearTimeout(callTimer);
    }, [callTimeLeft]);

    const listFriends = props.friends.map((e, idx) => <Friend activeFriend={activeFriend} changeFriend={changeFriend} key={idx} friendNum={idx} name={e.name} twitter_id={e.twitter_id} />);

    const btnCall = () => {
        // randomly pick one of the remaining answers
        // props.changePhoneAFriendSuggestion();
        setIsPhoneAFriendModalHidden(true);

        const btnCallTimeout = setTimeout(() => {
            props.changeViewPhoneAFriendModal();
        }, 500);
    };

    function changeFriend(key) {
        setActiveFriend(key);
    }

    useEffect(() => {
        setButtonText(`Call ${props.friends[activeFriend].name}`);
    }, [activeFriend]);

    useEffect(() => {
        props.changeTimerVisible();
    }, []);

    return (
        <div className={`phone-a-friend-modal__container ${isPhoneAFriendModalHidden ? 'hide-modal' : 'show-modal'}`}>
            <div className='phone-a-friend-modal__inner'>
                <img className='lifeline-image' src={phoneafriend} alt="modal__image" />
                <div className='friend-container'>{listFriends}</div>
                <div className='btn-call-name' onClick={btnCall}>{buttonText} - {callTimeLeft}</div>
            </div>
        </div>
    )
};

export default PhoneAFriendModal;