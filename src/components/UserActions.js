import '../styles/UserActions.css';
import Winners from './Winners/Winners';
import TotalGamesPlayed from './TotalGamesPlayed';

const UserActions = () => {
    return (
        <div className='user-actions'>
            <Winners/>
            <TotalGamesPlayed />
        </div>
    )
};

export default UserActions;