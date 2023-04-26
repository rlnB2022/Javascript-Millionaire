import '../styles/TotalGamesPlayed.css';
import { BsController } from 'react-icons/bs';
import { getStats } from '../utils/utils';
import { useEffect, useState } from 'react';

const TotalGamesPlayed = () => {
    const [gamesPlayed, setTotalGamesPlayed] = useState();

    /* When the component mounts, set the local state to the total number of winners */
    useEffect(() => {
        let isMounted = true;
        // create the async data fetching function
        const fetchGamesPlayed = async () => {
            const totalGamesPlayed = await getStats();

            // set state only if isMounted is true
            if(isMounted) {
                setTotalGamesPlayed(totalGamesPlayed);
            }
        }
        // call the above function to run when the component first loads - catch any errors
        fetchGamesPlayed().catch(console.error);

        // cancel any future setTotalGamesPlayed
        return () => isMounted = false;
    }, []);

    return (
        <div className='total-games-played action-button'>
            <BsController />
            <p className='games-played-name'>Games Played</p>
            <p className='games-played-number'>{gamesPlayed}</p>
        </div>
    )
};

export default TotalGamesPlayed;