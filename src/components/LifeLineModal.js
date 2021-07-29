import './LifeLineModal.css';

import fiftyfifty from '../fiftyfifty.png';
import phoneafriend from '../phoneafriend.png';
import asktheaudience from '../asktheaudience.png';

const LifeLineModal = (props) => {
    const imgs = [fiftyfifty, phoneafriend, asktheaudience];

    const modalImg = imgs[props.imgIndex];

    return (
        <div className='lifeline__modal'>
            <img src={modalImg} alt="modal__image" />
        </div>
    )
}

export default LifeLineModal;