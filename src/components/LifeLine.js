import './LifeLine.css';

const LifeLine = (props) => {

    return (
        <div className={`lifeline lifeline-visible-${props.lifelineindex}`}>
            <img src={props.imagename} alt={props.alt} onClick={() => props.changeViewLifeLineModal(props.lifelineindex)} />
        </div>
    );

}

export default LifeLine;