import './LifeLineContainer.css';
import LifeLine from './LifeLine';
import fiftyfifty from '../fiftyfifty.png';
import phoneafriend from '../phoneafriend.png';
import asktheaudience from '../asktheaudience.png';
import { useState, useEffect } from 'react';

const LifeLineContainer = (props) => {

    const [animIn, setAnimIn] = useState([false, false, false]);

    // useEffect(() => {
    //     const txtInterval = setInterval(function () {
    //         clearInterval(txtInterval);
    //         props.mainStateFlag();
    //         const moneyElem = document.querySelector('.current-money');
    //         moneyElem.classList.add('show-current-money');
    //     }, 2000);
    // }, []);

    let imageNames = [fiftyfifty, phoneafriend, asktheaudience];

    return (
        <div className="lifeline-container">
            {props.lifeline_fiftyfifty ?
                <LifeLine changeViewLifeLineModal={props.changeViewLifeLineModal}
                    mainStateFlag={props.mainStateFlag}
                    lifelineindex={0}
                    imagename={imageNames[0]} alt='50:50 LifeLine' /> : <div></div>}
            {props.lifeline_phoneafriend ?
                <LifeLine changeViewLifeLineModal={props.changeViewLifeLineModal}
                    mainStateFlag={props.mainStateFlag}
                    lifelineindex={1}
                    imagename={imageNames[1]} alt='Phone A Friend LifeLine' /> : <div></div>}
            {props.lifeline_asktheaudience ?
                <LifeLine changeViewLifeLineModal={props.changeViewLifeLineModal}
                    mainStateFlag={props.mainStateFlag}
                    lifelineindex={2}
                    imagename={imageNames[2]} alt='Ask The Audience LifeLine' /> : <div></div>}
        </div>
    );
}

export default LifeLineContainer;