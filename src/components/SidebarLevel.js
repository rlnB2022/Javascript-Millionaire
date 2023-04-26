import '../styles/SidebarLevel.css';
import { useSelector } from 'react-redux';

const SidebarLevel = ({level, money}) => {
    const currentLevel = useSelector(state => state.currentLevel);
    return (
        <div className={`sidebar-level ${currentLevel === (level-1) ? 'sidebarActive' : ''}`} >
            <p className='sidebar-level-number'>{level}</p>
            <p className='sidebar-level-amount'>{money}</p>
        </div >
    )
};

export default SidebarLevel;