import './App.css';
import StartGame from './components/StartGame';
import PreGame from './components/PreGame';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import ShowMoney from './components/ShowMoney';
import firebase from './firebase';
import React, { useState, useEffect } from 'react';
import GameOver from './components/GameOver';
import FinalAnswer from './components/FinalAnswer';
import AnswerPopup from './components/AnswerPopup';
import LifeLineModal from './components/LifeLineModal';

function App() {
  const moneyArr = ['$100', '$200', '$300', '$500', '$1,000', '$2,000', '$4,000', '$8,000', '$16,000', '$32,000', '$64,000', '$125,000', '$250,000', '$500,000', '$1 MILLION'];

  const [winners, setWinners] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  let [gamesPlayed, setGamesPlayed] = useState();
  let [gameState, setGameState] = useState(0);
  let [mainState, setMainState] = useState(0);
  let [answerState, setAnswerState] = useState(0);
  let [lifeLineFiftyFifty, setLifeLineFiftyFifty] = useState(1); // 1 = available
  let [lifeLinePhoneAFriend, setLifeLinePhoneAFriend] = useState(1); // 1 = available
  let [lifeLineAskTheAudience, setLifeLineAskTheAudience] = useState(1); // 1 = available
  let [moneylevel, setMoneyLevel] = useState(moneyArr[0]);
  let [currentLevel, setCurrentLevel] = useState(0);
  let [selectedAnswer, setSelectedAnswer] = useState(null); // null = not selected
  let [timerSeconds, setTimerSeconds] = useState(30);
  let [timerVisible, setTimerVisible] = useState(false);
  let [finalAnswerVisible, setFinalAnswerVisible] = useState(false);
  let [finalAnswerOpacity, setFinalAnswerOpacity] = useState(0);
  let [finalAnswerScale, setFinalAnswerScale] = useState(0);
  let [answerMessageOpacity, setAnswerMessageOpacity] = useState(0);
  let [answerMessageScale, setAnswerMessageScale] = useState(0);
  let [correctAnswerText, setCorrectAnswerText] = useState('Incorrect');
  let [correctAnswerResponse, setCorrectAnswerResponse] = useState(0); // 0 = Incorrect, 1 = Correct
  let [answerMessageVisible, setAnswerMessageVisible] = useState(false);
  let [answerButtonText, setAnswerButtonText] = useState('End Game');
  let [viewAllWinnersVisible, setViewAllWinnersVisible] = useState(false);
  let [viewLifeLineModal, setViewLifeLineModal] = useState(false); // change to false for production

  let ref = firebase.firestore().collection('questions_easy');

  function changeViewLifeLineModal() {
    setViewLifeLineModal(!viewLifeLineModal);
  }

  function changeTimerVisible() {
    setTimerVisible(!timerVisible);
  }

  function initTimer(num) {
    setTimerSeconds(num);
  }

  function showViewAllWinners() {
    setViewAllWinnersVisible(!viewAllWinnersVisible);
  }

  function showFinalAnswerVisible() {
    setFinalAnswerVisible(!finalAnswerVisible);

    if (finalAnswerVisible) {
      setFinalAnswerOpacity(0);
      setFinalAnswerScale(0);
      setSelectedAnswer(null);
    }
    else {
      setFinalAnswerOpacity(1);
      setFinalAnswerScale(1);
    }
  }

  function changeTimerSeconds() {
    setTimerSeconds(--timerSeconds);
  }

  function changeGameState() {
    setGameState(++gameState);
  }

  function changeMainState() {
    setMainState(++mainState);
  }

  function changeAnswerState() {
    setAnswerState(++answerState);
  }

  function nextQuestion() {
    setGameState(1);
  }

  function addHideMoneyClass() {
    const el = document.querySelector('.show-money');

    el.classList.add('hide-money');
  };

  function animateStartGame() {
    const startGame = document.querySelector('.start-game');

    startGame.classList.add('fade-out-start-game');

    // record game played in database
    storeGamePlayed();

    changeGameState();
  }

  function storeGamePlayed() {
    const res = firebase.firestore().collection('stats').doc('games').set({ played: gamesPlayed + 1 });
  }

  function isAnswerCorrect(num) {
    setFinalAnswerVisible(false);

    setFinalAnswerOpacity(0);
    setFinalAnswerScale(0);

    setTimerSeconds(0);

    if (num === questions[currentLevel].answer_correct) {
      // if (currentLevel < moneyArr.length - 1) {
      //   setCurrentLevel(++currentLevel);
      // }

      // // getQuestion();

      // setMoneyLevel(moneyArr[currentLevel - 1]);

      // resetSelection();

      setCorrectAnswerText('Correct');
      setAnswerButtonText('Next Question');
    }

    // incorrect answer
    showAnswerMessageVisible();

  }

  function showAnswerMessageVisible() {

    setAnswerMessageVisible(!answerMessageVisible);

    if (answerMessageVisible) {
      setAnswerMessageOpacity(0);
      setAnswerMessageScale(0);
    }
    else {
      setAnswerMessageOpacity(1);
      setAnswerMessageScale(1);
    }

    if (correctAnswerText === 'Incorrect') {

    }
  }

  function answerSelected(num) {
    setSelectedAnswer(num);
  }

  function shuffle(arr) {
    arr.sort(function () {
      return Math.random() - 0.5;
    });

    return arr;
  }

  async function getStats() {
    const statRef = firebase.firestore().collection('stats');
    const snapshot_totalgames = await statRef.get();
    const gp = snapshot_totalgames.docs[0].data().played;

    setGamesPlayed(gp);
  }

  async function getQuestions() {
    setLoading(true);

    // if(difficulty === 1) {
    //   ref = firebase.firestore().collection('questions_easy');
    // }
    // else if(difficulty === 2) {
    //   ref = firebase.firestore().collection('questions_medium');
    // }
    // else {
    //   ref = firebase.firestore().collection('questions_hard');
    // }

    ref = firebase.firestore().collection('questions_easy');
    const snapshot_easy = await ref.limit(5).get();

    // ref.where('difficulty', '==', difficulty).onSnapshot(querySnapshot => {
    const items_easy = [];

    snapshot_easy.forEach(doc => {
      items_easy.push(doc.data());
    });

    // shuffle the array
    shuffle(items_easy);

    // console.log(items_easy);

    // get random question
    // const randomIndex = Math.floor(Math.random() * items.length);

    setQuestions(questions => [...questions, ...items_easy]);

    // console.log(questions);

    // medium questions
    ref = firebase.firestore().collection('questions_medium');
    const snapshot_medium = await ref.limit(5).get();

    // // ref.where('difficulty', '==', difficulty).onSnapshot(querySnapshot => {
    const items_medium = [];

    snapshot_medium.forEach(doc => {
      items_medium.push(doc.data());
    });

    // // shuffle the array
    shuffle(items_medium);

    // console.log(items_medium);

    setQuestions(questions => [...questions, ...items_medium]);

    // // hard questions
    ref = firebase.firestore().collection('questions_hard');
    const snapshot_hard = await ref.limit(5).get();

    // // ref.where('difficulty', '==', difficulty).onSnapshot(querySnapshot => {
    const items_hard = [];

    snapshot_hard.forEach(doc => {
      items_hard.push(doc.data());
    });

    // // shuffle the array
    shuffle(items_hard);

    // console.log(items_hard);

    setQuestions(questions => [...questions, ...items_hard]);

    // // millionaire questions
    ref = firebase.firestore().collection('questions_million');
    const snapshot_million = await ref.limit(1).get();

    // // ref.where('difficulty', '==', difficulty).onSnapshot(querySnapshot => {
    // let randomMillionQuestion = Math.floor(Math.random() * snapshot_million.docs.length);

    const items_million = [];

    snapshot_million.forEach(doc => {
      items_million.push(doc.data());
    });

    // console.log(items_million[randomMillionQuestion]);

    setQuestions(questions => [...questions, ...items_million]);

    setLoading(false);
    // });

  }

  useEffect(() => {
    if (timerSeconds < 0) {
      setTimerVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      changeTimerSeconds(timerSeconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timerSeconds]);

  useEffect(() => {
    if (selectedAnswer !== null) {

      // show popup for 'Final Answer?'
      const myTimeout = setTimeout(() => {
        showFinalAnswerVisible();
        // const finalAnswerContainer = document.querySelector('.final-answer-container');
        // finalAnswerContainer.classList.add('show-final-answer-container');

        clearTimeout(myTimeout);
      }, 500);
    }

  }, [selectedAnswer]);

  async function getWinners() {
    let ref = firebase.firestore().collection('winners');
    const snapshotRecentWinners = await ref.get();
    const newArray = [];

    snapshotRecentWinners.forEach(doc => {
      newArray.push(doc.data());
    });

    setWinners(oldArray => [...oldArray, ...newArray]);
  }

  useEffect(() => {
    getQuestions();
    getStats();
    getWinners();
  }, []);

  useEffect(() => {
  }, [questions]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='app'>
      {gameState === 0 ? <StartGame showViewAllWinners={showViewAllWinners} allWinnersVisible={viewAllWinnersVisible} winners={winners} fadeScreen={animateStartGame} gameStateFlag={changeGameState} gamesPlayed={gamesPlayed} /> : null}
      {gameState === 1 ? <PreGame gameStateFlag={changeGameState} /> : null}
      {gameState === 2 ? <ShowMoney
        gameStateFlag={changeGameState}
        hidemoney={addHideMoneyClass}
        money={moneyArr[currentLevel]}
        /> : null}
      {gameState === 3 ? <Main
        timerVisible={timerVisible}
        changeTimerVisible={changeTimerVisible}
        timerSeconds={timerSeconds}
        initTimer={initTimer}
        theAnswerState={answerState}
        answerStateFlag={changeAnswerState}
        mainStateFlag={changeMainState}
        theMainState={mainState}
        gameStateFlag={changeGameState}
        currentMoney={moneylevel}
        answers={questions[currentLevel]}
        changeAnswerSelected={answerSelected}
        answerSelected={selectedAnswer}
        questionID={questions[currentLevel].id}
        lifeline_fiftyfifty={lifeLineFiftyFifty}
        lifeline_asktheaudience={lifeLineAskTheAudience}
        lifeline_phoneafriend={lifeLinePhoneAFriend}
        viewLifeLineModal={viewLifeLineModal}
        changeViewLifeLineModal={changeViewLifeLineModal}
      /> : null}
      {gameState === 4 ? <Sidebar /> : null}
      {gameState === 5 ? <GameOver /> : null}

      {gameState === 3 ? <FinalAnswer
        isAnswerCorrect={isAnswerCorrect}
        cancelSelected={answerSelected}
        op={finalAnswerOpacity}
        sc={finalAnswerScale}
        answers={questions[currentLevel]}
        visible={showFinalAnswerVisible}
        answerSelected={selectedAnswer} /> : null}

      {gameState === 3 ? <AnswerPopup
        correctAnswerText={correctAnswerText}
        correctAnswerResponse={correctAnswerResponse}
        visible={answerMessageVisible}
        op={answerMessageOpacity}
        sc={answerMessageScale}
        answers={questions[currentLevel]}
        correctAnswer={questions[currentLevel].answer_correct}
        answer_popup_button={answerButtonText} /> : null}
        {viewLifeLineModal ? <LifeLineModal /> : null}
    </div>
  );
}

export default App;
