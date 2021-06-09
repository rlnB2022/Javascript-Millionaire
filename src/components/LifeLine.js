import './LifeLine.css';

function LifeLine(props) {
    console.log(props);
    return (
        <div className="lifeline">
            <img src={props.imageName} alt='Lifeline' />
        </div>
    );
}

export default LifeLine;