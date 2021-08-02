import './PhoneAFriendModal.css';
import phoneafriend from '../phoneafriend.png';
import Friend from './Friend';

const PhoneAFriendModal = (props) => {

    const listFriends = props.friends.map((e, idx) => <Friend key={idx} name={e.name} twitter_id={e.twitter_id} />);

    return (
        <div className='phone-a-friend-modal__container'>
            <div className='phone-a-friend-modal__inner'>
                <img className='lifeline-image' src={phoneafriend} alt="modal__image" />
                <div className='friend-container'>{listFriends}</div>
                <div className='btn-call-name'>Call</div>
            </div>
        </div>
    )
};

export default PhoneAFriendModal;