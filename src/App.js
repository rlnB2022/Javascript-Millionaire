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
import BlurModal from './components/BlurModal';
import AskTheAudienceModal from './components/AskTheAudienceModal';
import PhoneAFriendModal from './components/PhoneAFriendModal';

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
  let [moneyLevel, setMoneyLevel] = useState(moneyArr[0]);
  let [currentLevel, setCurrentLevel] = useState(0);
  let [selectedAnswer, setSelectedAnswer] = useState(null); // null = not selected
  let [timerVisible, setTimerVisible] = useState(false);
  let [timerInitSeconds, setTimerInitSeconds] = useState(0);
  const [finalAnswerVisible, setFinalAnswerVisible] = useState(false);
  let [answerMessageOpacity, setAnswerMessageOpacity] = useState(0);
  let [answerMessageScale, setAnswerMessageScale] = useState(0);
  let [correctAnswerText, setCorrectAnswerText] = useState('Incorrect');
  let [correctAnswerResponse, setCorrectAnswerResponse] = useState(0); // 0 = Incorrect, 1 = Correct
  let [answerMessageVisible, setAnswerMessageVisible] = useState(false);
  let [answerButtonText, setAnswerButtonText] = useState('End Game');
  let [viewLifeLineModal, setViewLifeLineModal] = useState(false); // change to false for production
  let [lifeLineModalImage, setLifeLineModalImage] = useState(0);
  let [viewBlurModal, setViewBlurModal] = useState(false);
  let [viewAskTheAudienceModal, setViewAskTheAudienceModal] = useState(false);
  let [viewPhoneAFriendModal, setViewPhoneAFriendModal] = useState(false);
  let [friends, setFriends] = useState([]);
  let [phoneAFriendSuggestion, setPhoneAFriendSuggestion] = useState(0);

  async function getWinners() {
    let ref = firebase.firestore().collection('winners');
    const snapshotRecentWinners = await ref.limit(3).get();
    const newArray = [];

    snapshotRecentWinners.forEach(doc => {
      newArray.push(doc.data());
    });

    setWinners(oldArray => [...oldArray, ...newArray]);
  }

  function useLifeLine(index) {

    changeViewLifeLineModal();

    if (index === 0) {
      // 50:50 lifeline used
      const cor = questions[currentLevel].answer_correct - 1;

      // fix array so that only incorrect answer indexes are included
      const incorrectAnswers = [0, 1, 2, 3];
      incorrectAnswers.splice(cor, 1);

      // randomly choose one of these arrays to stay
      const chosenNumber = Math.floor(Math.random() * incorrectAnswers.length);

      // remove chosenNumber from array leaving only answers that should be hidden
      incorrectAnswers.splice(chosenNumber, 1);

      // get all elements with .lifeline
      const answerElems = document.querySelectorAll('.answer');
      answerElems[incorrectAnswers[0]].classList.add('hide-answer');
      answerElems[incorrectAnswers[1]].classList.add('hide-answer');
      answerElems[incorrectAnswers[0]].classList.remove('answer-visible-0');
      answerElems[incorrectAnswers[1]].classList.remove('answer-visible-0');

      // disable 50:50 lifeline
      setLifeLineFiftyFifty(0);
    }
    else if (index === 1) {
      // Phone A Friend lifeline used
      changeViewPhoneAFriend();

      setLifeLinePhoneAFriend(0);
    }
    else {
      // Ask The Audience lifeline used
      changeViewAskTheAudienceModal()

      setLifeLineAskTheAudience(0);
    }
  }

  function changeTimerInitSeconds(num) {
    setTimerInitSeconds(num);
  }

  function changeViewPhoneAFriend() {
    setViewBlurModal(!viewPhoneAFriendModal);
    setViewPhoneAFriendModal(!viewPhoneAFriendModal);
  }

  function changeViewAskTheAudienceModal() {
    setViewBlurModal(true);
    setViewAskTheAudienceModal(true);
  }

  function hideAskTheAudienceModal() {
    setViewBlurModal(false);
    setViewAskTheAudienceModal(false);
  }

  function changeViewLifeLineModal(img) {
    changeViewBlurModal();
    setLifeLineModalImage(img);
    setViewLifeLineModal(!viewLifeLineModal);
  }

  function changeViewBlurModal() {
    setViewBlurModal(!viewBlurModal);
  }

  function changeTimerVisible() {
    setTimerVisible(!timerVisible);
  }

  function changeFinalAnswerVisible() {
    setSelectedAnswer(null);
    setFinalAnswerVisible(!finalAnswerVisible);
  }

  function changeGameState() {
    setGameState(gameState + 1);
  }

  function changeMainState() {
    setMainState(mainState + 1);
  }

  function changeAnswerState() {
    setAnswerState(answerState + 1);
  }

  function nextQuestion() {
    if (currentLevel < moneyArr.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setSelectedAnswer(null);
      setMainState(0);
      setAnswerState(0);
    }

    setAnswerMessageVisible(false);
    setGameState(2);
  }

  useEffect(() => {
    setMoneyLevel(moneyArr[currentLevel]);
  },[currentLevel]);

    function animateStartGame() {
    // record game played in database
    storeGamePlayed();

    changeGameState();

    changeTimerInitSeconds(30);
  }

  function storeGamePlayed() {
    const res = firebase.firestore().collection('stats').doc('games').set({ played: gamesPlayed + 1 });
  }

  function changePhoneAFriendSuggestion() {
    let sugg = -1;

    const suggestionCorrectChance = (16 - currentLevel) * 7;

    const suggestionCorrectPCT = Math.floor(Math.random() * 100) + 1;

    if (suggestionCorrectPCT <= suggestionCorrectChance) {
      // guesses the correct answer
      sugg = questions[currentLevel].answer_correct;
    }
    else {
      // guesses an incorrect answer
    }

    setPhoneAFriendSuggestion(sugg);
  }

  function isAnswerCorrect(num) {
    setFinalAnswerVisible(false);

    setTimerVisible(false);

    if (num === questions[currentLevel].answer_correct) {
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

    let ref = firebase.firestore().collection('questions_easy');
    const snapshot_easy = await ref.get();

    const items_easy = [];

    snapshot_easy.forEach(doc => {
      items_easy.push(doc.data());
    });

    // shuffle the array
    shuffle(items_easy);

    setQuestions(questions => [...questions, ...items_easy.slice(-5)]);

    // medium questions
    ref = firebase.firestore().collection('questions_medium');
    const snapshot_medium = await ref.limit(5).get();

    const items_medium = [];

    snapshot_medium.forEach(doc => {
      items_medium.push(doc.data());
    });

    // // shuffle the array
    shuffle(items_medium);

    setQuestions(questions => [...questions, ...items_medium.slice(-5)]);

    // // hard questions
    ref = firebase.firestore().collection('questions_hard');
    const snapshot_hard = await ref.limit(5).get();

    const items_hard = [];

    snapshot_hard.forEach(doc => {
      items_hard.push(doc.data());
    });

    // // shuffle the array
    shuffle(items_hard);

    setQuestions(questions => [...questions, ...items_hard.slice(-5)]);

    // // millionaire questions
    ref = firebase.firestore().collection('questions_million');
    const snapshot_million = await ref.get();

    const items_million = [];

    snapshot_million.forEach(doc => {
      items_million.push(doc.data());
    });

    setQuestions(questions => [...questions, ...items_million.slice(-1)]);

    setLoading(false);

  }

  useEffect(() => {
    if (selectedAnswer !== null) {

      // show popup for 'Final Answer?'
        changeFinalAnswerVisible();
    }

  }, [selectedAnswer]);

  useEffect(() => {
    // highlight suggested answer

  }, [phoneAFriendSuggestion]);

  async function getFriends() {
    let ref = firebase.firestore().collection('Friends');
    const snapshotFriends = await ref.get();
    const newArr = [];

    snapshotFriends.forEach(doc => {
      newArr.push(doc.data());
    });

    shuffle(newArr);

    setFriends(oldArr => [...oldArr, ...newArr.slice(-3)]);
  }

  useEffect(() => {
    getQuestions();
    getWinners();
    getStats();
    getFriends();
  }, []);

  useEffect(() => {
  }, [questions]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='app'>
      {gameState === 0 ? <StartGame winners={winners} startGame={animateStartGame} gamesPlayed={gamesPlayed} /> : null}
      {gameState === 1 ? <PreGame changeGameState={changeGameState} /> : null}
      {gameState === 2 ? <ShowMoney
        changeGameState={changeGameState}
        money={moneyArr[currentLevel]}
      /> : null}
      {gameState === 3 ? <Main
        timerVisible={timerVisible}
        changeTimerVisible={changeTimerVisible}
        timerInitSeconds={timerInitSeconds}
        theAnswerState={answerState}
        answerStateFlag={changeAnswerState}
        mainStateFlag={changeMainState}
        theMainState={mainState}
        changeGameState={changeGameState}
        currentMoney={moneyLevel}
        answers={questions[currentLevel]}
        changeAnswerSelected={answerSelected}
        answerSelected={selectedAnswer}
        questionID={questions[currentLevel].id}
        lifeline_fiftyfifty={lifeLineFiftyFifty}
        lifeline_asktheaudience={lifeLineAskTheAudience}
        lifeline_phoneafriend={lifeLinePhoneAFriend}
        viewLifeLineModal={viewLifeLineModal}
        changeViewLifeLineModal={changeViewLifeLineModal}
        viewAskTheAudienceModal={viewAskTheAudienceModal}
        changeViewAskTheAudienceModal={changeViewAskTheAudienceModal}
      /> : null}
      {/* {gameState === 4 ? <Sidebar /> : null} */}
      {gameState === 4 ? <GameOver /> : null}

      {finalAnswerVisible ? <FinalAnswer
        changeVisible={changeFinalAnswerVisible}
        isAnswerCorrect={isAnswerCorrect}
        cancelSelected={answerSelected}
        answers={questions[currentLevel]}
        answerSelected={selectedAnswer} /> : null}

      {answerMessageVisible ? <AnswerPopup
        correctAnswerText={correctAnswerText}
        correctAnswerResponse={correctAnswerResponse}
        op={answerMessageOpacity}
        sc={answerMessageScale}
        answers={questions[currentLevel]}
        correctAnswer={questions[currentLevel].answer_correct}
        answer_popup_button={answerButtonText}
        nextQuestion={nextQuestion} /> : null}

      {viewLifeLineModal ? <LifeLineModal useLifeLine={useLifeLine} changeViewLifeLineModal={changeViewLifeLineModal} lifeLineModalImage={lifeLineModalImage} /> : null}

      {viewAskTheAudienceModal ? <AskTheAudienceModal answer={questions[currentLevel]} hideAskTheAudienceModal={hideAskTheAudienceModal} changeViewAskTheAudienceModal={changeViewAskTheAudienceModal} /> : null}

      {viewPhoneAFriendModal ? <PhoneAFriendModal changePhoneAFriendSuggestion={changePhoneAFriendSuggestion} friends={friends} changeViewPhoneAFriendModal={changeViewPhoneAFriend} /> : null}

      {viewBlurModal ? <BlurModal /> : null}
    </div>
  );
}

export default App;