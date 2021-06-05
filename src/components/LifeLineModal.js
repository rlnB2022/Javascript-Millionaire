import './LifeLineModal.css';

import fiftyfifty from '../fiftyfifty.png';
import phoneafriend from '../phoneafriend.png';
import asktheaudience from '../asktheaudience.png';
import { useEffect, useState } from 'react';

const LifeLineModal = (props) => {

    const imgs = [fiftyfifty, phoneafriend, asktheaudience];
    const lifelineName = ['50:50', 'Phone A Friend', 'Ask the Audience'];
    const [isHidden, setIsHidden] = useState(false);
    const [usingLifeline, setUsingLifeline] = useState(false);

    const modalImg = imgs[props.lifeLineModalImage];

    useEffect(() => {
        if (isHidden) {
            const myTimer = setTimeout(() => {
                props.changeViewLifeLineModal();

                if(usingLifeline) {
                    props.useLifeLine(props.lifeLineModalImage);
                }
                clearTimeout(myTimer);
            }, 500);
        }
    }, [isHidden]);

    useEffect(() => {
        if(usingLifeline) {
            setIsHidden(true);
        }
    },[usingLifeline]);

    return (
        <div className={`lifeline__modal--container ${isHidden ? 'hide-modal' : 'show-modal'}`}>
            <div className='lifeline__modal'>
                <img src={modalImg} alt="modal__image" />
                <p>Are you sure you want to use your {lifelineName[props.lifeLineModalImage]} lifeline?</p>
                <div className='lifeline__modal--options'>
                    <div className='lifeline__button lifeline__modal--option-no' onClick={() => setIsHidden(true)}>No</div>
                    <div className='lifeline__button lifeline__modal--option-yes' onClick={() => setUsingLifeline(true)}>Yes</div>
                </div>
            </div>
        </div>
    )
}

export default LifeLineModal;