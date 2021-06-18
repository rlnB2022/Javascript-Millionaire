import './Friend.css';
import { useState, useEffect } from 'react';

const Friend = (props) => {

    let imageName = require('../' + props.twitter_id + '.jpg');

    const [bColor, setBorderColor] = useState('gray');
    
    function changeBorderColor(color) {
        setBorderColor(color);
    }

    useEffect(() => {
        if(props.activeFriend === props.friendNum) {
            changeBorderColor('orange');
        }
        else {
            changeBorderColor('#0172FF');
        }
    }, [props.activeFriend]);

    return (
        <div className='friend' style={{borderColor: bColor}} onClick={() => props.changeFriend(props.friendNum)}>
            <img src={imageName.default} alt="friend" />
            <div>{props.name}</div>
        </div>
    )
};

export default Friend;