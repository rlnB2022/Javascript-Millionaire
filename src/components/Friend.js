import '../styles/Friend.css';
import { useState, useEffect } from 'react';

const Friend = (props) => {

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
                clearTimeout(friendTimeOut);
            }, 500);
        }
        else {
            setFriendHasChanged(false);
            changeBorderColor('#0172FF');
        }
    }, [props.activeFriend]);

    return (
        <div 
            className={`friend ${props.friendIsVisible 
                ? '' 
                : 'friend-hidden'} ${friendHasChanged 
                    ? 'profile-bounce' 
                    : 'profile-bounce-back'}`} 
            style={{borderColor: bColor}} 
            onClick={() => props.changeFriend(props.friendNum)}>
                <div>{props.name}</div>
        </div>
    )
};

export default Friend;
