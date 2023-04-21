import '../styles/LifeLineContainer.css';
import LifeLine from './LifeLine';
import fiftyfifty from '../fiftyfifty.png';
import phoneafriend from '../phoneafriend.png';
import asktheaudience from '../asktheaudience.png';
import { useSelector } from 'react-redux';

const LifeLineContainer = (props) => {

    const lifeLineFiftyFifty = useSelector(state => state.lifeLineFiftyFifty);
    const lifeLinePhoneAFriend = useSelector(state => state.lifeLinePhoneAFriend);
    const lifeLineAskTheAudience = useSelector(state => state.lifeLineAskTheAudience);
    
    let imageNames = [fiftyfifty, phoneafriend, asktheaudience];

    return (
        <div className="lifeline-container">
            {lifeLineFiftyFifty 
                ? <LifeLine 
                    lifeLineIndex={0}
                    imageName={imageNames[0]} 
                    alt='50:50 LifeLine' /> 
                : null}
            {lifeLinePhoneAFriend 
                ? <LifeLine 
                    lifeLineIndex={1}
                    imageName={imageNames[1]} 
                    alt='Phone A Friend LifeLine' /> 
                : null}
            {lifeLineAskTheAudience 
                ? <LifeLine 
                    lifeLineIndex={2}
                    imageName={imageNames[2]} 
                    alt='Ask The Audience LifeLine' /> 
                : null}
        </div>
    );
}

export default LifeLineContainer;