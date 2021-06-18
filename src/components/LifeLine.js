import './LifeLine.css';

const LifeLine = (props) => {

    const usingLifeline = () => {
        // disable lifeline clickable
        // props.changeLifelineClickable();

        // show modal
        props.changeViewLifeLineModal(props.lifelineindex);
    };

    return (
        <div className={`lifeline lifeline-visible-${props.lifelineindex}`}>
            <img src={props.imagename} alt={props.alt} onClick={usingLifeline} />
        </div>
    );

}

export default LifeLine;