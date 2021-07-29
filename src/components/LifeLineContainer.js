import './LifeLineContainer.css';
import LifeLine from './LifeLine';
import fiftyfifty from '../fiftyfifty.png';
import phoneafriend from '../phoneafriend.png';
import asktheaudience from '../asktheaudience.png';
import { useEffect } from 'react';

const LifeLineContainer = (props) => {

    useEffect(() => {
        const txtInterval = setInterval(function() {
            clearInterval(txtInterval);
            props.mainStateFlag();
            const moneyElem = document.querySelector('.current-money');
            moneyElem.classList.add('show-current-money');
        },2000);
    },[]);

    let propsArr = [];

    for(const prop in props) {
        propsArr.push(`${props[prop]}`);
    }

    let imageNames = [fiftyfifty, phoneafriend, asktheaudience];

    let imageItems = imageNames.map((item, index) => {
        return <LifeLine changeViewLifeLineModal={props.changeViewLifeLineModal} mainStateFlag={props.mainStateFlag} lifelineindex={index} imagename={item} key={index} isvisible={propsArr[index]} />
    });

    return (
        <div className="lifeline-container">
            {imageItems}
        </div>
    );
}

export default LifeLineContainer;