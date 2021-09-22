import './ViewAllWinners.css';
import { useState, useEffect } from 'react';
import firebase from '../firebase';

const ViewAllWinners = (props) => {

    const [allWinners, setAllWinners] = useState([]);
    const [visible, setVisible] = useState(false);
    const [readyToAnimateWinners, setReadyToAnimateWinners] = useState(false);

    async function getAllWinners() {
        let ref = firebase.firestore().collection('winners');
        const snapshotAllWinners = await ref.get();
        const newArray = [];

        snapshotAllWinners.forEach(doc => {
            newArray.push(doc.data());
        });

        setAllWinners(oldArray => [...oldArray, ...newArray]);
    }

    const hideAllWinners = () => {
        setVisible(false);
        setTimeout(() => {
            setReadyToAnimateWinners(false);
            props.showViewAllWinners();
        }, 600);
    };

    useEffect(() => {
        getAllWinners();

        setTimeout(() => {
            setVisible(!visible);

            // wait 1/2 second to animate in winners
            setTimeout(() => {
                setReadyToAnimateWinners(true);
            }, 500);

        }, 100);
    }, []);

    useEffect(() => {
        if (readyToAnimateWinners) {
            console.log('yes');
        }
    }, [readyToAnimateWinners]);

    const listItems = allWinners.map((e, idx) => <div style={{position: 'relative', left: '-100vw', animation: `move-winners-in .4s ease-in forwards ${idx * .2}s`}} key={idx}><div>{e.name}</div><div>{e.date}</div></div>);

    return (
        <div className={`view-all-winners-container ${visible ? 'fade-in' : ''}`}>
            <div className='all-winners'>
                {listItems}
            </div>
            <div className='btn-container' onClick={hideAllWinners}><div className='btn-close-all-winners-list'>Ok</div></div>
        </div >
    )
};

export default ViewAllWinners;