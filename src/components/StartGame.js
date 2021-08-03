import './StartGame.css';
import RecentWinners from './RecentWinners';
import imgTitle from '../title.png';
import Stats from './Stats';
import ViewAllWinners from './ViewAllWinners';

const StartGame = (props) => {
    return (
        <div className='start-game'>
            <img src={imgTitle} alt="title"/>
            <RecentWinners winners={props.winners} showViewAllWinners={props.showViewAllWinners}/>
            {props.allWinnersVisible ? <ViewAllWinners winners={props.winners} showViewAllWinners={props.showViewAllWinners} /> : null}
            <Stats gamesPlayed={props.gamesPlayed}/>
            <button onClick={() => props.fadeScreen()}>Start Game</button>
            <p className="created-by">Created by <a href="https://twitter.com/rick99gtp">@rick99gtp</a></p>
        </div>
    );
}

export default StartGame;