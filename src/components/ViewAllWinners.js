import '../styles/ViewAllWinners.css';
import { getWinners } from '../utils/utils';
import { useState, useEffect } from 'react';

const ViewAllWinners = ({showViewAllWinners}) => {

    const [allWinners, setAllWinners] = useState([]);
    const [visible, setVisible] = useState(false);

    const hideAllWinners = () => {
        setVisible(false);
        setTimeout(() => {
            showViewAllWinners();
        }, 600);
    };

    /* When the component mounts, get the list of winners to display */
    useEffect(() => {
        let isMounted = true;
        // create the async data fetching function
        const fetchWinners = async () => {
            const listOfWinners = await getWinners();

            // set state only if isMounted is true
            if(isMounted) {
                setAllWinners(listOfWinners);
            }
        }
        // call the above function to run when the component first loads and catch any errors
        fetchWinners().catch(console.error);

        setTimeout(() => {
            setVisible(true);
        }, 100);

        // cancel any future setTotalWinners
        return () => isMounted = false;
    }, []);

    // construct the list of winners
    const listItems = allWinners.map((winner, idx) =>
        <li className='winner-item'
            style={{
                left: '-100vw',
                animation: `move-winners-in .4s ease-out forwards ${idx * .1}s`
            }}
            key={winner + idx}>
            <div>{winner.name}</div>
            <div>{winner.date}</div>
        </li>);

    return (
        <div className={`view-all-winners-container ${visible ? 'fade-in' : ''}`}>
            <ul className='all-winners'>
                {listItems}
            </ul>
            <div className='btn-container' onClick={hideAllWinners}>
                <div className='btn-close-all-winners-list'>Ok</div>
            </div>
        </div >
    )
};

export default ViewAllWinners;