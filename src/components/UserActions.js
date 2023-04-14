import '../styles/UserActions.css';
import Winners from './Winners';
import TotalGamesPlayed from './TotalGamesPlayed';

const UserActions = (props) => {
    return (
        <div className='user-actions'>
            <Winners showViewAllWinners={props.showViewAllWinners} numWinners={props.winners.length} onClick={props.showViewAllWinners}/>
            <TotalGamesPlayed gamesPlayed={props.gamesPlayed}/>
        </div>
    )
};

export default UserActions;