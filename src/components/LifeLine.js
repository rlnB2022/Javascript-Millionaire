import '../styles/LifeLine.css';
import fiftyfifty from '../fiftyfifty.png';
import phoneafriend from '../phoneafriend.png';
import asktheaudience from '../asktheaudience.png';
import { useDispatch, batch } from 'react-redux';

const LifeLine = (props) => {
    const dispatch = useDispatch();

    const imageNames = [fiftyfifty, phoneafriend, asktheaudience];

    const useLifeline = () => {
        batch(() => {
            dispatch({ type: 'toggleLifeLineClickable' });
            dispatch({ type: 'toggleViewLifeLineModal' });
            dispatch({ type: 'setLifeLineModalImageIndex', lifeLineImageIndex: props.lifeLineIndex})
          })
    };

    return (
        <div className={`lifeline lifeline-visible-${props.lifeLineIndex}`}>
            <img src={imageNames[props.lifeLineIndex]} alt={props.alt} onClick={useLifeline} />
        </div>
    );

}

export default LifeLine;