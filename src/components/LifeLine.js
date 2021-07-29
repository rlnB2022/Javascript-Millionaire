import './LifeLine.css';

const LifeLine = (props) => {

    return (
        <div className='lifeline'>
            <img src={props.imagename} alt='Lifeline' className='' onClick={() => props.changeViewLifeLineModal(props.lifelineindex)} />
        </div>
    );

}

export default LifeLine;