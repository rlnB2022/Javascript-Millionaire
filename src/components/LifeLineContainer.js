import './LifeLineContainer.css';
import LifeLine from './LifeLine';
import fiftyfifty from '../fiftyfifty.jpg';
import phoneafriend from '../phoneafriend.jpg';
import asktheaudience from '../asktheaudience.jpg';

function LifeLineContainer(props) {
    let propsArr = [];
    
    for(const prop in props) {
        propsArr.push(`${props[prop]}`);
    }

    let imageNames = [fiftyfifty, phoneafriend, asktheaudience];

    let imageItems = imageNames.map((item, index) => {
        return <LifeLine imagename={item} key={index} isvisible={propsArr[index]} />
    });

    return (
        <div className="lifeline-container">
            {imageItems}
        </div>
    );
}

export default LifeLineContainer;