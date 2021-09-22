import './UserActions.css';
import Winners from './Winners';
import TotalGamesPlayed from './TotalGamesPlayed';

const UserActions = (props) => {
    return (
        <div className='user-actions'>
            <Winners />
            <TotalGamesPlayed gamesPlayed={props.gamesPlayed}/>
        </div>
    )
};

export default UserActions;