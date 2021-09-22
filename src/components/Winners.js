import './Winners.css';
import { BiTrophy } from 'react-icons/bi';

const Winners = props => {
    return (
        <div className='winners action-button'>
            <BiTrophy />
            <p className='winners-name'>Winners</p>
            <p>{props.winners}</p>
        </div>
    )
};

export default Winners;