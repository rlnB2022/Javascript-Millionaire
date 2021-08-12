import './ViewAllWinners.css';
import { useState, useEffect } from 'react';
import firebase from '../firebase';

const ViewAllWinners = (props) => {

    const [allWinners, setAllWinners] = useState([]);

    // async function getAllWinners() {
    //     let ref = firebase.firestore().collection('winners');
    //     const snapshotAllWinners = await ref.get();
    //     const newArray = [];
    
    //     snapshotAllWinners.forEach(doc => {
    //       newArray.push(doc.data());
    //     });
    
    //     setAllWinners(oldArray => [...oldArray, ...newArray]);
    // }

    // useEffect(() => {
        // getAllWinners();
    // }, []);

    const listItems = allWinners.map((e, idx) => <li key={idx}><div>{e.name}</div><div>{e.date}</div></li>);

    return (
        <div className='view-all-winners-container'>
            <h1>Total Winners:</h1>
            <div className='winners-list'>
                <ul id='ul-all-winners'>
                    {listItems}
                </ul>
                <div className='btn-container' onClick={props.showViewAllWinners}><div className='btn-close-all-winners-list'>Ok</div></div>
            </div>
        </div>
    )
};

export default ViewAllWinners;