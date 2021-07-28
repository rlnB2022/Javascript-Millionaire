import './ViewAllWinners.css';

const ViewAllWinners = (props) => {

    const listItems = props.winners.map((e, idx) => <li key={idx}><div>{e.name}</div><div>{e.date}</div></li>);

    return (
        <div className='view-all-winners-container'>
            <h1>Total Winners:</h1>
            <div className='winners-list'>
                <ul id='ul-all-winners'>
                    {listItems}
                </ul>
                <div className='btn-container' onClick={props.showViewAllWinners}><div className='btn-close-all-winners-list'>Ok</div></div>
            </div>
        </div>
    )
};

export default ViewAllWinners;