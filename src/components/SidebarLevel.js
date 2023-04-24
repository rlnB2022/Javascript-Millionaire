import '../styles/SidebarLevel.css';
import { useSelector } from 'react-redux';

const SidebarLevel = (props) => {
    const currentLevel = useSelector(state => state.currentLevel);
    return (
        <div className={`sidebar-level ${currentLevel === (props.level-1) ? 'sidebarActive' : ''}`} >
            <p className='sidebar-level-number'>{props.level}</p>
            <p className='sidebar-level-amount'>{props.money}</p>
        </div >
    )
};

export default SidebarLevel;