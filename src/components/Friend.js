import '../styles/Friend.css';
import { useState, useEffect } from 'react';

const Friend = ({activeFriend, changeFriend, friendIsVisible, friendNum, name}) => {

    const [bColor, setBorderColor] = useState('gray');
    const [friendHasChanged, setFriendHasChanged] = useState(false);
    
    /* Set the border to the selected/active friend */
    function changeBorderColor(color) {
        setBorderColor(color);
    }

    /* When the active friend changes, update local state, if necessary - change the border color */
    useEffect(() => {
        if(activeFriend === friendNum) {
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
    }, [activeFriend]);

    return (
        <div 
            className={`friend ${friendIsVisible 
                ? '' 
                : 'friend-hidden'} ${friendHasChanged 
                    ? 'profile-bounce' 
                    : 'profile-bounce-back'}`} 
            style={{borderColor: bColor}} 
            onClick={() => changeFriend(friendNum)}>
                <div>{name}</div>
        </div>
    )
};

export default Friend;
