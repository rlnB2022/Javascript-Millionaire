// styles
import './styles/App.css';

// components
import StartGame from './components/StartGame';
import PreGame from './components/PreGame';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import ShowMoney from './components/ShowMoney';
import GameOver from './components/GameOver';
import FinalAnswer from './components/FinalAnswer';
import AnswerPopup from './components/AnswerPopup';
import LifeLineModal from './components/LifeLineModal';
import AskTheAudienceModal from './components/AskTheAudienceModal';
import PhoneAFriendModal from './components/PhoneAFriendModal';
import MillionaireWinner from './components/MillionaireWinner';

// add firebase
import firebase from './firebase';

// import hooks
import React, { useState, useEffect } from 'react';

function App() {
  const moneyArr = ['$100', '$200', '$300', '$500', '$1,000', '$2,000', '$4,000', '$8,000', '$16,000', '$32,000', '$64,000', '$125,000', '$250,000', '$500,000', '$1 MILLION'];
  
  const [questions, setQuestions] = useState([]);
  const questionName = ['questions_easy', 'questions_medium', 'questions_hard', 'questions_million'];
  const [loading, setLoading] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // game states
  const [gameState, setGameState] = useState(0);
  const [mainState, setMainState] = useState(0);
  const [answerState, setAnswerState] = useState(0);

  // Lifeline state
  const [lifeLineFiftyFifty, setLifeLineFiftyFifty] = useState(1); // 1 = available
  const [lifeLinePhoneAFriend, setLifeLinePhoneAFriend] = useState(1); // 1 = available
  const [lifeLineAskTheAudience, setLifeLineAskTheAudience] = useState(1); // 1 = available

  const [moneyLevel, setMoneyLevel] = useState(moneyArr[0]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // null = not selected

  // Timer state
  const [timerVisible, setTimerVisible] = useState(false);
  const [timerInitSeconds, setTimerInitSeconds] = useState(0);

  const [finalAnswerVisible, setFinalAnswerVisible] = useState(false);
  const [answerMessageOpacity, setAnswerMessageOpacity] = useState(0);
  const [answerMessageScale, setAnswerMessageScale] = useState(0);
  const [correctAnswerText, setCorrectAnswerText] = useState('Incorrect');
  const [answerMessageVisible, setAnswerMessageVisible] = useState(false);
  const [answerButtonText, setAnswerButtonText] = useState('End Game');

  // modals
  const [viewLifeLineModal, setViewLifeLineModal] = useState(false);
  const [lifeLineModalImage, setLifeLineModalImage] = useState(0);
  const [viewAskTheAudienceModal, setViewAskTheAudienceModal] = useState(false);
  const [viewPhoneAFriendModal, setViewPhoneAFriendModal] = useState(false);
  const [viewMillionaireWinner, setViewMillionaireWinner] = useState(false);

  const [friends, setFriends] = useState([]);
  const [lifelineClickable, setLifelineClickable] = useState(false);

  const useLifeLine = (index) => {

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
      answerElems[incorrectAnswers[0]].classList.remove('answer-visible');
      answerElems[incorrectAnswers[1]].classList.remove('answer-visible');

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

  const homeScreen = () => {
    resetGame();
    getQuestions();
    getStats();
  };

  const resetGame = () => {
    setGameState(0);
    setMainState(0);
    setLifeLineFiftyFifty(1);
    setLifeLinePhoneAFriend(1);
    setLifeLineAskTheAudience(1);
    setCurrentLevel(0);
    setLifelineClickable(false);
    setViewMillionaireWinner(false);
    setQuestions([]);
  };

  const storeWinnerName = (name) => {

    // get today's date
    const d = new Date();
    const newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();

    const res = firebase.firestore().collection('winners').add({ name: name, date: newDate });

    homeScreen();

  };

  const changeTimerInitSeconds = (num) => {
    setTimerInitSeconds(num);
  }

  const changeViewPhoneAFriend = () => {
    setViewPhoneAFriendModal(!viewPhoneAFriendModal);
  }

  const changeViewAskTheAudienceModal = () => {
    setViewAskTheAudienceModal(true);
  }

  const hideAskTheAudienceModal = () => {
    setViewAskTheAudienceModal(false);
  }

  const changeViewLifeLineModal = img => {
    if (lifelineClickable) {
      setLifeLineModalImage(img);
      setViewLifeLineModal(!viewLifeLineModal);
    }
  }

  const changeLifelineClickable = () => {
    setLifelineClickable(!lifelineClickable);
  }

  const changeTimerVisible = () => {
    setTimerVisible(!timerVisible);
  }

  const changeFinalAnswerVisible = () => {
    setFinalAnswerVisible(!finalAnswerVisible);
  }

  const changeGameState = () => {
    setGameState(gameState + 1);
  }

  const changeMainState = () => {
    setMainState(mainState + 1);
  }

  const changeAnswerState = () => {
    setAnswerState(answerState + 1);
  }

  const nextQuestion = () => {

    if (answerButtonText === 'End Game') {
      setAnswerMessageVisible(false);
      changeGameState();
      return;
    }

    if (currentLevel < moneyArr.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setSelectedAnswer(null);
      setMainState(0);
      setAnswerState(0);
      setLifelineClickable(false);
    }

    setAnswerMessageVisible(false);
    setGameState(2);

    // reset messages
    setCorrectAnswerText('Incorrect');
    setAnswerButtonText('End Game');
  }

  useEffect(() => {
    setMoneyLevel(moneyArr[currentLevel]);
  }, [currentLevel]);

  const animateStartGame = () => {
    setSidebarVisible(true);
    // record game played in database
    storeGamePlayed();

    changeGameState();

    changeTimerInitSeconds(30);
  }

  const storeGamePlayed = () => {
    const res = firebase.firestore().collection('stats').doc('games').set({ played: gamesPlayed + 1 });
  }

  const changePhoneAFriendSuggestion = () => {
    let sugg = -1;

    const suggestionCorrectChance = (16 - currentLevel) * 7;
    const suggestionCorrectPCT = Math.floor(Math.random() * 100) + 1;

    if (suggestionCorrectPCT <= suggestionCorrectChance) {
      // guesses the correct answer
      sugg = questions[currentLevel].answer_correct - 1;
    }
    else {
      // guesses an incorrect answer
      const answerElems = document.querySelectorAll('.answer');
      const cor = questions[currentLevel].answer_correct - 1;
      const incorrectAnswersArray = [0, 1, 2, 3];

      // remove correct answer from array leaving only incorrect answers
      incorrectAnswersArray.splice(cor, 1);

      // check to make sure the incorrect answers have not been removed already with the 50:50 lifeline
      for (let i = 0; i < incorrectAnswersArray.length; i++) {
        if (answerElems[i].classList.contains('answer-hidden')) {
          // if there is a match, remove from array
          incorrectAnswersArray.splice(i, 1);
        }
      }

      sugg = Math.floor(Math.random() * incorrectAnswersArray.length);
    }

    return sugg;
  }

  const isAnswerCorrect = (num) => {
    storeAnswerSelected();
    setFinalAnswerVisible(false);

    setTimerVisible(false);

    if (num === questions[currentLevel].answer_correct) {
      setCorrectAnswerText('Correct!');

      // if answered the last question, they won!
      if (currentLevel === 14) {
        setGameState(5);
        setFinalAnswerVisible(false);
        setAnswerMessageVisible(false);
        setViewLifeLineModal(false);
        setViewAskTheAudienceModal(false);
        setViewPhoneAFriendModal(false);

        setViewMillionaireWinner(true);
        setSidebarVisible(false);

        return;
      }
      else {
        setAnswerButtonText('Next Question');
        showAnswerMessageVisible();
        return;
      }

    }

    // incorrect answer
    showAnswerMessageVisible();

  }

  const getDifficultyName = () => {
    return questionName[Math.floor((currentLevel + 1) / 5)];
  };

  async function storeAnswerSelected() {

    // get name of question difficulty
    const diff = getDifficultyName();

    // get reference to collection
    const collRef = firebase.firestore().collection(diff);

    try {
      // query collection for specific document
      const queryRef = await collRef.where('question', '==', questions[currentLevel].question).get();
  
      if (queryRef.empty) {
        console.log('No doc exists.');
      }
      else {
  
        // get id of document
        const docId = queryRef.docs[0].id;
  
        // get value of user_selected answer
        const totalSelected = queryRef.docs[0].data()['user_selected_' + (selectedAnswer + 1)] + 1;
  
        const cityRef = collRef.doc(docId);
  
        const userSel = 'user_selected_' + (selectedAnswer + 1);
  
        const res = cityRef.update({ [userSel]: totalSelected });
  
      }
    } catch (err) {
      console.error(err.message);
    }

  };

  const showAnswerMessageVisible = () => {

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

  const answerSelected = (num) => {
    setSelectedAnswer(num);
  }

  function shuffle(originalArray) {
    var array = [].concat(originalArray);
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  async function getStats() {
    const statRef = firebase.firestore().collection('stats');
    try {
      const snapshot_totalgames = await statRef.get();
      const gp = snapshot_totalgames.docs[0].data().played;
  
      setGamesPlayed(gp);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getQuestions() {
    setLoading(true);

    let ref = firebase.firestore().collection('questions_easy');
    try {
      const snapshot_easy = await ref.get();
  
      let items_easy = [];
  
      snapshot_easy.forEach(doc => {
        items_easy.push(doc.data());
      });
  
      // shuffle the array
      const a = shuffle(items_easy);
  
      setQuestions(questions => [...questions, ...a.slice(-5)]);
    } catch (err) {
      console.error(err.message);
    }

    // medium questions
    ref = firebase.firestore().collection('questions_medium');
    try {
      const snapshot_medium = await ref.get();
  
      const items_medium = [];
  
      snapshot_medium.forEach(doc => {
        items_medium.push(doc.data());
      });
  
      // // shuffle the array
      shuffle(items_medium);
  
      setQuestions(questions => [...questions, ...items_medium.slice(-5)]);
    } catch (err) {
      console.error(err.message);
    }

    // // hard questions
    ref = firebase.firestore().collection('questions_hard');
    try {
      const snapshot_hard = await ref.get();
  
      const items_hard = [];
  
      snapshot_hard.forEach(doc => {
        items_hard.push(doc.data());
      });
  
      // // shuffle the array
      shuffle(items_hard);
  
      setQuestions(questions => [...questions, ...items_hard.slice(-4)]);
    } catch (err) {
      console.error(err.message);
    }

    // // millionaire questions
    ref = firebase.firestore().collection('questions_million');
    try {
      const snapshot_million = await ref.get();
  
      const items_million = [];
  
      snapshot_million.forEach(doc => {
        items_million.push(doc.data());
      });
  
      setQuestions(a => [...a, ...items_million.slice(-1)]);
  
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }

  }

  useEffect(() => {
    if (selectedAnswer !== null) {

      // show popup for 'Final Answer?'
      changeFinalAnswerVisible();
    }

  }, [selectedAnswer]);

  useEffect(() => {
    if (!finalAnswerVisible) {
      setSelectedAnswer(null);
    }
  }, [finalAnswerVisible]);

  async function getFriends() {
    let ref = firebase.firestore().collection('Friends');
    try {
      const snapshotFriends = await ref.get();
      const newArr = [];
  
      snapshotFriends.forEach(doc => {
        newArr.push(doc.data());
      });
  
      shuffle(newArr);
  
      setFriends(oldArr => [...oldArr, ...newArr.slice(-3)]);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getQuestions();
    getStats();
    getFriends();
  }, []);

  // hide all visible elements except the game over modal if game is over
  useEffect(() => {
    if (gameState === 4) {
      setFinalAnswerVisible(false);
      setAnswerMessageVisible(false);
      setViewLifeLineModal(false);
      setViewAskTheAudienceModal(false);
      setViewPhoneAFriendModal(false);
      setSidebarVisible(false);
    }
  }, [gameState]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='app'>
      {gameState === 0 ? <StartGame startGame={animateStartGame} gamesPlayed={gamesPlayed} /> : null}
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
        changeLifelineClickable={changeLifelineClickable}
      /> : null}
      {gameState >= 1 && sidebarVisible ? <Sidebar money={moneyArr} currentLevel={currentLevel} /> : null}

      {finalAnswerVisible ? <FinalAnswer
        changeVisible={changeFinalAnswerVisible}
        isAnswerCorrect={isAnswerCorrect}
        cancelSelected={answerSelected}
        answers={questions[currentLevel]}
        answerSelected={selectedAnswer} /> : null}

      {answerMessageVisible ? <AnswerPopup
        correctAnswerText={correctAnswerText}
        op={answerMessageOpacity}
        sc={answerMessageScale}
        answers={questions[currentLevel]}
        correctAnswer={questions[currentLevel].answer_correct}
        answer_popup_button={answerButtonText}
        nextQuestion={nextQuestion} /> : null}

      {viewLifeLineModal ? <LifeLineModal useLifeLine={useLifeLine} changeViewLifeLineModal={changeViewLifeLineModal} lifeLineModalImage={lifeLineModalImage} /> : null}

      {viewAskTheAudienceModal ? <AskTheAudienceModal answer={questions[currentLevel]} hideAskTheAudienceModal={hideAskTheAudienceModal} changeViewAskTheAudienceModal={changeViewAskTheAudienceModal} /> : null}

      {viewPhoneAFriendModal ? <PhoneAFriendModal changeLifeLineClickable={changeLifelineClickable} changeTimerVisible={changeTimerVisible} changeTimerInitSeconds={changeTimerInitSeconds} answers={questions[currentLevel]} changePhoneAFriendSuggestion={changePhoneAFriendSuggestion} friends={friends} changeViewPhoneAFriendModal={changeViewPhoneAFriend} /> : null}

      {gameState === 4 ? <GameOver homeScreen={homeScreen} level={moneyArr[currentLevel]} /> : null}

      {viewMillionaireWinner ? <MillionaireWinner storeWinnerName={storeWinnerName} /> : null}
    </div>
  );
}

export default App;