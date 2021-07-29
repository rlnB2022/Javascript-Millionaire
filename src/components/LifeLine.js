import './LifeLine.css';

const LifeLine = (props) => {

    if(props.isvisible) {
        if(props.lifelineindex === 0) {
            return (
                <div className="lifeline">
                    <img src={props.imagename} alt='Lifeline' className='lifeline-visible-0' onClick={props.changeViewLifeLineModal}/>
                </div>
            );
        }
        else if(props.lifelineindex === 1) {
            return (
                <div className="lifeline">
                    <img src={props.imagename} alt='Lifeline' className='lifeline-visible-1'/>
                </div>
            );
        }
        return (
            <div className="lifeline">
                <img src={props.imagename} alt='Lifeline' className='lifeline-visible-2'/>
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