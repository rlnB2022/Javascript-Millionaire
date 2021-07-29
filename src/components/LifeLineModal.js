import './LifeLineModal.css';

import fiftyfifty from '../fiftyfifty.png';
import phoneafriend from '../phoneafriend.png';
import asktheaudience from '../asktheaudience.png';

const LifeLineModal = (props) => {
    const imgs = [fiftyfifty, phoneafriend, asktheaudience];
    const lifelineName = ['50:50', 'Phone A Friend', 'Ask the Audience'];

    const modalImg = imgs[props.lifeLineModalImage];

    return (
        <div className='lifeline__modal'>
            <img src={modalImg} alt="modal__image" />
            <p>Are you sure you want to use your {lifelineName[props.lifeLineModalImage]} lifeline?</p>
            <div className='lifeline__modal--options'>
                <div className='lifeline__button lifeline__modal--option-no' onClick={props.changeViewLifeLineModal}>No</div>
                <div className='lifeline__button lifeline__modal--option-yes'>Yes</div>
            </div>
        </div>
    )
}

export default LifeLineModal;