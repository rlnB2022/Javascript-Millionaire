import '../styles/LifeLine.css';

const LifeLine = (props) => {

    const useLifeline = () => {
        // show modal
        props.changeViewLifeLineModal(props.lifeLineIndex);
        props.changeLifelineClickable();
    };

    return (
        <div className={`lifeline lifeline-visible-${props.lifeLineIndex}`}>
            <img src={props.imageName} alt={props.alt} onClick={useLifeline} />
        </div>
    );

}

export default LifeLine;