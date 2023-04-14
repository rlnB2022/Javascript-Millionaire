import '../styles/SidebarLevel.css';

const SidebarLevel = (props) => {
    return (
        <div className={`sidebar-level ${props.currentLevel === (props.level-1) ? 'sidebarActive' : ''}`} >
            <p className='sidebar-level-number'>{props.level}</p>
            <p className='sidebar-level-amount'>{props.money}</p>
        </div >
    )
};

export default SidebarLevel;