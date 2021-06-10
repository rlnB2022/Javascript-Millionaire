import './LifeLine.css';

function LifeLine(props) {
    return (
        <div className="lifeline">
            <img src={props.imagename} alt='Lifeline' />
        </div>
    );
}

export default LifeLine;