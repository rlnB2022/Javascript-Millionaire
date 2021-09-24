import './sidebar.css';
import SidebarLevel from './SidebarLevel';

const Sidebar = (props) => {
    // reverse the array so the MILLION DOLLARS is on top
    const newArr = [...props.money].reverse();
    
    // loop through array to create component list
    // shouldn't use the index but have no other option
    // also, elements won't be deleted so disrupting the order-not as important
    const elems = newArr.map((e, idx) =>
    <SidebarLevel
        currentLevel={props.currentLevel}
        key={idx}
        level={15 - idx}
        money={e} />);

    return (
        <div className='sidebar'>
            {elems}
        </div>
    )
}

export default Sidebar;