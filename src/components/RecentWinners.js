import './RecentWinners.css';
import firebase from '../firebase';
import { useEffect, useState } from 'react';

const RecentWinners = (props) => {

    const [winners, setWinners] = useState([]);

    // async function getWinners() {
    //     let ref = firebase.firestore().collection('winners');
    //     const snapshotRecentWinners = await ref.limit(3).get();
    //     const newArray = [];
    
    //     snapshotRecentWinners.forEach(doc => {
    //       newArray.push(doc.data());
    //     });
    
    //     setWinners(oldArray => [...oldArray, ...newArray]);
    // }

    useEffect(() => {
        // getWinners();
    }, []);

    const listItems = winners.map((e, idx) => <li key={idx}><div>{ e.name }</div><div>{ e.date }</div></li>);

    return (
        <div className="winners">
            <h1>Recent Winners</h1>
            <ul>
                {listItems}
            </ul>
            <div id="viewAllWinners"><p className='view-all-winners__button' onClick={props.showViewAllWinners}>View All</p></div>
        </div>
    );
}

export default RecentWinners;
