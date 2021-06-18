import './PhoneAFriendModal.css';
import phoneafriend from '../phoneafriend.png';
import Friend from './Friend';
import { useEffect, useState } from 'react';

const PhoneAFriendModal = (props) => {

    const [activeFriend, setActiveFriend] = useState(0);
    const [buttonText, setButtonText] = useState('Call');

    const listFriends = props.friends.map((e, idx) => <Friend activeFriend={activeFriend} changeFriend={changeFriend} key={idx} friendNum={idx} name={e.name} twitter_id={e.twitter_id} />);

    function btnCall() {

        // randomly pick one of the remaining answers
        props.changePhoneAFriendSuggestion();
        props.changeViewPhoneAFriendModal();
    }

    function changeFriend(key) {
        setActiveFriend(key);
    }

    useEffect(() => {
        setButtonText(`Call ${props.friends[activeFriend].name}`);
    },[activeFriend]);

    return (
        <div className='phone-a-friend-modal__container'>
            <div className='phone-a-friend-modal__inner'>
                <img className='lifeline-image' src={phoneafriend} alt="modal__image" />
                <div className='friend-container'>{listFriends}</div>
                <div className='btn-call-name' onClick={btnCall}>{buttonText}</div>
            </div>
        </div>
    )
};

export default PhoneAFriendModal;