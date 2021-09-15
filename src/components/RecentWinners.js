import './RecentWinners.css';
import { useState } from 'react';
import { useEffect } from 'react';

const RecentWinners = (props) => {

    const [numWinners, setNumWinners] = useState(0);

    const listItems = props.winners.map((e, idx) => <li key={idx}><div>{ e.name }</div><div>{ e.date }</div></li>);

    useEffect(() => {
        setNumWinners(listItems.length)
    }, []);

    return (
        <div className="winners">
            <h1>Recent Winners</h1>
            <ul>
                {numWinners === 0 ? <li>No Recent Winners</li> : null}
                {listItems}
            </ul>
            <div id="viewAllWinners"><p className='view-all-winners__button' onClick={props.showViewAllWinners}>View All</p></div>
        </div>
    );
}

export default RecentWinners;