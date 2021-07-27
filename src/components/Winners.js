import './winners.css';
import { useEffect, useState } from 'react';

const Winners = (props) => {

    const listItems = props.winners.map(e => <li>{ e }</li>);

    return (
        <div className="winners">
            <h1>Recent Winners</h1>
            <ul>
                {listItems}
            </ul>
            <a id="viewAllWinners" href="#">View All</a>
        </div>
    );
}

export default Winners;
