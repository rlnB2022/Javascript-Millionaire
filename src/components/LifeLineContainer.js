import './LifeLineContainer.css';
import LifeLine from './LifeLine';
import fiftyfifty from '../fiftyfifty.png';
import phoneafriend from '../phoneafriend.png';
import asktheaudience from '../asktheaudience.png';
import { useEffect } from 'react';

const LifeLineContainer = (props) => {

    useEffect(() => {
        const txtInterval = setInterval(function () {
            clearInterval(txtInterval);
            props.mainStateFlag();
            const moneyElem = document.querySelector('.current-money');
            moneyElem.classList.add('show-current-money');
        }, 2000);
    }, []);

    let propsArr = [];

    for (const prop in props) {
        propsArr.push(`${props[prop]}`);
    }

    let imageNames = [fiftyfifty, phoneafriend, asktheaudience];

    return (
        <div className="lifeline-container">
            {props.lifeline_fiftyfifty ?
                <LifeLine changeViewLifeLineModal={props.changeViewLifeLineModal}
                    mainStateFlag={props.mainStateFlag}
                    lifelineindex={0}
                    imagename={imageNames[0]} /> : <div></div>}
            {props.lifeline_phoneafriend ?
                <LifeLine changeViewLifeLineModal={props.changeViewLifeLineModal}
                    mainStateFlag={props.mainStateFlag}
                    lifelineindex={1}
                    imagename={imageNames[1]} /> : <div></div>}
            {props.lifeline_asktheaudience ?
                <LifeLine changeViewLifeLineModal={props.changeViewLifeLineModal}
                    mainStateFlag={props.mainStateFlag}
                    lifelineindex={2}
                    imagename={imageNames[2]} /> : <div></div>}
        </div>
    );
}

export default LifeLineContainer;