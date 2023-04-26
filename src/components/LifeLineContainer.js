import '../styles/LifeLineContainer.css';
import LifeLine from './LifeLine';
import { useSelector } from 'react-redux';

const LifeLineContainer = () => {

    /* These values hold the boolean for whether they are displayed or not */
    const lifeLineFiftyFifty = useSelector(state => state.lifeLineFiftyFifty);
    const lifeLinePhoneAFriend = useSelector(state => state.lifeLinePhoneAFriend);
    const lifeLineAskTheAudience = useSelector(state => state.lifeLineAskTheAudience);
    
    return (
        <div className="lifeline-container">
            {lifeLineFiftyFifty 
                ? <LifeLine 
                    lifeLineIndex={0}
                    altText='50:50 LifeLine' /> 
                : <div></div>}
            {lifeLinePhoneAFriend 
                ? <LifeLine 
                    lifeLineIndex={1}
                    altText='Phone A Friend LifeLine' /> 
                : <div></div>}
            {lifeLineAskTheAudience 
                ? <LifeLine 
                    lifeLineIndex={2}
                    altText='Ask The Audience LifeLine' /> 
                : <div></div>}
        </div>
    );
}

export default LifeLineContainer;