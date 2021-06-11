import './LifeLine.css';

function LifeLine(props) {
    let style = {
        opacity: .2
    };

    if(props.isvisible === 'false') {
        return (
            <div className="lifeline">
                <img src={props.imagename} alt='Lifeline' style={style}/>
            </div>
        );
    }

    return (
        <div className="lifeline">
            <img src={props.imagename} alt='Lifeline' />
        </div>
    );

}

export default LifeLine;