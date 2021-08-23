import './Friend.css';
import { useState, useEffect } from 'react';

const Friend = (props) => {

    let imageName = require('../' + props.twitter_id + '.jpg');

    const [bColor, setBorderColor] = useState('gray');
    const [friendHasChanged, setFriendHasChanged] = useState(false);
    
    function changeBorderColor(color) {
        setBorderColor(color);
    }

    useState(() => {

    },[props.friendIsVisible]);

    useEffect(() => {
        if(props.activeFriend === props.friendNum) {
            changeBorderColor('orange');
            setFriendHasChanged(true);

            const friendTimeOut = setTimeout(() => {
                clearTimeout(friendTimeOut);
            }, 500);
        }
        else {
            setFriendHasChanged(false);
            changeBorderColor('#0172FF');
        }
    }, [props.activeFriend]);

    return (
        <div className={`friend ${props.friendIsVisible ? '' : 'friend-hidden'} ${friendHasChanged ? 'profile-bounce' : 'profile-bounce-back'}`} style={{borderColor: bColor}} onClick={() => props.changeFriend(props.friendNum)}>
            <img src={imageName.default} alt="friend" />
            <div>{props.name}</div>
        </div>
    )
};

export default Friend;