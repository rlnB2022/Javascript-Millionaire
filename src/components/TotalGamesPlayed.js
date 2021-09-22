import './TotalGamesPlayed.css';
import { BsController } from 'react-icons/bs';

const TotalGamesPlayed = props => {
    return (
        <div className='total-games-played action-button'>
            <BsController />
            <p className='games-played-name'>Games Played</p>
            <p className='games-played-number'>{props.gamesPlayed}</p>
        </div>
    )
};

export default TotalGamesPlayed;