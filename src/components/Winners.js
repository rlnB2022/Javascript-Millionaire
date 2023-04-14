import '../styles/Winners.css';
import { BiTrophy } from 'react-icons/bi';
import { getWinners } from '../utils/utils';
import { useEffect, useState } from 'react';

const Winners = props => {
    const [ totalWinners, setTotalWinners] = useState('');
    /**
     * sets state to the total number of winners
     */
    useEffect(() => {
        async function getListOfWinners() {
            const listOfWinners = await getWinners();
            const winnersCount = listOfWinners.length;
            setTotalWinners(winnersCount);
        }
        getListOfWinners();
    }, []);

    return (
        <div className='winners action-button' onClick={props.showViewAllWinners}>
            <BiTrophy />
            <p className='winners-name'>Winners</p>
            <p className='winners-number'>{totalWinners}</p>
        </div>
    )
};

export default Winners;