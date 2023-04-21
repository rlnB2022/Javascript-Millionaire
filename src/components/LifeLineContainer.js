import '../styles/LifeLineContainer.css';
import LifeLine from './LifeLine';
import { useSelector } from 'react-redux';

const LifeLineContainer = () => {

    const lifeLineFiftyFifty = useSelector(state => state.lifeLineFiftyFifty);
    const lifeLinePhoneAFriend = useSelector(state => state.lifeLinePhoneAFriend);
    const lifeLineAskTheAudience = useSelector(state => state.lifeLineAskTheAudience);
    
    return (
        <div className="lifeline-container">
            {lifeLineFiftyFifty 
                ? <LifeLine 
                    lifeLineIndex={0}
                    alt='50:50 LifeLine' /> 
                : null}
            {lifeLinePhoneAFriend 
                ? <LifeLine 
                    lifeLineIndex={1}
                    alt='Phone A Friend LifeLine' /> 
                : null}
            {lifeLineAskTheAudience 
                ? <LifeLine 
                    lifeLineIndex={2}
                    alt='Ask The Audience LifeLine' /> 
                : null}
        </div>
    );
}

export default LifeLineContainer;