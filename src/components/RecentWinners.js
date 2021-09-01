import './RecentWinners.css';

const RecentWinners = (props) => {

    // sort recent winners by date
    // const sorted = [...props.winners].sort((a,b) => b-a);

    // console.log(sorted);

    // const sortedArr = props.winners;//.sort((a,b) => b.date-a.date);

    const listItems = props.winners.map((e, idx) => <li key={idx}><div>{ e.name }</div><div>{ e.date }</div></li>);

    return (
        <div className="winners">
            <h1>Recent Winners</h1>
            <ul>
                {listItems}
            </ul>
            <div id="viewAllWinners"><p className='view-all-winners__button' onClick={props.showViewAllWinners}>View All</p></div>
        </div>
    );
}

export default RecentWinners;