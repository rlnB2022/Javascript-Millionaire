import '../styles/UserActions.css';
import Winners from './Winners';
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