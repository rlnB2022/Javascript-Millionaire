import './Winners.css';
import { BiTrophy } from 'react-icons/bi';

const Winners = props => {
    return (
        <div className='winners action-button' onClick={props.showViewAllWinners}>
            <BiTrophy />
            <p className='winners-name'>Winners</p>
            <p className='winners-number'>{props.numWinners}</p>
        </div>
    )
};

export default Winners;