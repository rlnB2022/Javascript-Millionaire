// import { React } from 'react';
import './winners.css';

function Winners(props) {
    return (
        <div className="winners">
            <h1>Recent Winners</h1>
            <ul className="winners-list">
                <li>Winner 1</li>
                <li>Winner 2</li>
                <li>Winner 3</li>
            </ul>
            <a href="#">View All</a>
        </div>
    );
}

export default Winners;