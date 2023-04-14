import '../styles/Winners.css';
import { BiTrophy } from 'react-icons/bi';
import ViewAllWinners from './ViewAllWinners';
import { getWinners } from '../utils/utils';
import { useEffect, useState } from 'react';

const Winners = () => {
    const [ totalWinners, setTotalWinners] = useState('');
    const [ viewAllWinnersVisible, setViewAllWinnersVisible ] = useState(false);

    /**
     * Display all winners toggle
     */
    const showViewAllWinners = () => {
        setViewAllWinnersVisible(!viewAllWinnersVisible);
    };

    /**
     * sets state to the total number of winners
     */
    useEffect(() => {
        let isMounted = true;
        // create the async data fetching function
        const fetchWinners = async () => {
            const listOfWinners = await getWinners();
            const winnersCount = listOfWinners.length;

            // set state only if isMounted is true
            if(isMounted) {
                setTotalWinners(winnersCount);
            }
        }
        // call the above function to run when the component first loads and catch any errors
        fetchWinners().catch(console.error);

        // cancel any future setTotalWinners
        return () => isMounted = false;
    }, []);

    return (
        <div className='winners action-button' onClick={showViewAllWinners}>
            <BiTrophy />
            <p className='winners-name'>Winners</p>
            <p className='winners-number'>{totalWinners}</p>
            {viewAllWinnersVisible ? <ViewAllWinners showViewAllWinners={showViewAllWinners} /> : null}
        </div>
    )
};

export default Winners;