import './Friend.css';
import { useState, useEffect } from 'react';

const Friend = (props) => {

    let imageName = require('../' + props.twitter_id + '.jpg');

    const [bColor, setBorderColor] = useState('gray');
    const [friendHasChanged, setFriendHasChanged] = useState(false);
    
    function changeBorderColor(color) {
        setBorderColor(color);
    }

    useEffect(() => {
        if(props.activeFriend === props.friendNum) {
            changeBorderColor('orange');
            setFriendHasChanged(true);

            const friendTimeOut = setTimeout(() => {
                setFriendHasChanged(false);
                clearTimeout(friendTimeOut);
            }, 500);
        }
        else {
            changeBorderColor('#0172FF');
        }
    }, [props.activeFriend]);

    return (
        <div className='friend' style={{borderColor: bColor}} onClick={() => props.changeFriend(props.friendNum)}>
            <img className={friendHasChanged ? 'profile-bounce' : ''} src={imageName.default} alt="friend" />
            <div className={friendHasChanged ? 'profile-bounce' : ''}>{props.name}</div>
        </div>
    )
};

export default Friend;