import '../styles/LifeLine.css';
import { useDispatch, batch } from 'react-redux';

const LifeLine = (props) => {
    const dispatch = useDispatch();

    const useLifeline = () => {
        // show modal
        batch(() => {
            dispatch({ type: 'toggleLifeLineClickable' });
            dispatch({ type: 'toggleViewLifeLineModal' });
          })
    };

    return (
        <div className={`lifeline lifeline-visible-${props.lifeLineIndex}`}>
            <img src={props.imageName} alt={props.alt} onClick={useLifeline} />
        </div>
    );

}

export default LifeLine;