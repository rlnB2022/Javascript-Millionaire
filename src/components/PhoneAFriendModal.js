import './PhoneAFriendModal.css';
import phoneafriend from '../phoneafriend.png';
import Friend from './Friend';
import { useState } from 'react';

const PhoneAFriendModal = (props) => {

    let [activeFriend,setActiveFriend] = useState(-1);

    const listFriends = props.friends.map((e, idx) => <Friend activeFriend={activeFriend} changeFriend={changeFriend} key={idx} friendNum={idx} name={e.name} twitter_id={e.twitter_id} />);

    function btnCall() {
        props.changeViewPhoneAFriendModal();
    }

    function changeFriend(key) {
        setActiveFriend(key);
        console.log(key);
    }

    return (
        <div className='phone-a-friend-modal__container'>
            <div className='phone-a-friend-modal__inner'>
                <img className='lifeline-image' src={phoneafriend} alt="modal__image" />
                <div className='friend-container'>{listFriends}</div>
                <div className='btn-call-name' onClick={btnCall}>Call</div>
            </div>
        </div>
    )
};

export default PhoneAFriendModal;