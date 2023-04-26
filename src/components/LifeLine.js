import '../styles/LifeLine.css';
import fiftyfifty from '../fiftyfifty.png';
import phoneafriend from '../phoneafriend.png';
import asktheaudience from '../asktheaudience.png';
import { useDispatch, batch } from 'react-redux';

const LifeLine = ({altText, lifeLineIndex}) => {
    const dispatch = useDispatch();

    /* store the image files as an array, 
       accessible in JSX below by the lifeLineIndex that is passed in as a prop */
    const imageNames = [fiftyfifty, phoneafriend, asktheaudience];

    /* Handle multiple dispatches when a lifeline is used */
    const useLifeline = () => {
        batch(() => {
            dispatch({ type: 'toggleLifeLineClickable' });
            dispatch({ type: 'toggleViewLifeLineModal' });
            dispatch({ type: 'setLifeLineModalIndex', lifeLineIndex: lifeLineIndex})
          })
    };

    return (
        <div className={`lifeline lifeline-visible-${lifeLineIndex}`}>
            <img src={imageNames[lifeLineIndex]} alt={altText} onClick={useLifeline} />
        </div>
    );

}

export default LifeLine;