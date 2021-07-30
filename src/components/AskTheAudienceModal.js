import './AskTheAudienceModal.css';
import asktheaudience from '../asktheaudience.png';

const AskTheAudienceModal = (props) => {

    return (
        <div className='ask-the-audience-modal'>
            <img src={asktheaudience} alt="modal__image" />
        </div>
    );
}

export default AskTheAudienceModal;