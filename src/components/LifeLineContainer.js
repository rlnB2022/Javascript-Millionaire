import './LifeLineContainer.css';
import LifeLine from './LifeLine';
import fiftyfifty from '../fiftyfifty.png';
import phoneafriend from '../phoneafriend.png';
import asktheaudience from '../asktheaudience.png';

function LifeLineContainer(props) {
    let propsArr = [];
    
    for(const prop in props) {
        propsArr.push(`${props[prop]}`);
    }

    let imageNames = [fiftyfifty, phoneafriend, asktheaudience];

    let imageItems = imageNames.map((item, index) => {
        return <LifeLine gameStateFlag={props.gameStateFlag} lifelineindex={index} imagename={item} key={index} isvisible={propsArr[index]} />
    });

    return (
        <div className="lifeline-container">
            {imageItems}
        </div>
    );
}

export default LifeLineContainer;