import '../styles/sidebar.css';
import SidebarLevel from './SidebarLevel';
import { useState, useEffect } from 'react';

const Sidebar = (props) => {
    const [visible, setVisible] = useState(false);
    
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

    useEffect(() => {
        setTimeout(() => {
            setVisible(true);
        }, 100);
    }, []);

    return (
        <div className={`sidebar ${visible ? 'show-sidebar' : ''}`}>
            {elems}
        </div>
    )
}

export default Sidebar;