import './App.css';
import StartGame from './components/StartGame';
import PreGame from './components/PreGame';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import ShowMoney from './components/ShowMoney';
import firebase from './firebase';
import React, { useState, useEffect } from 'react';

function App() {
  const moneyArr = ['$100', '$200', '$300', '$500', '$1,000', '$2,000', '$4,000', '$8,000', '$16,000', '$32,000', '$64,000', '$125,000', '$250,000', '$500,000', '$1 MILLION'];

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  let [gameState, setGameState] = useState(0);
  let [lifeLineFiftyFifty, setLifeLineFiftyFifty] = useState(1); // 1 = available
  let [lifeLinePhoneAFriend, setLifeLinePhoneAFriend] = useState(1); // 1 = available
  let [lifeLineAskTheAudience, setLifeLineAskTheAudience] = useState(1); // 1 = available
  let [moneylevel, setMoneyLevel] = useState(moneyArr[0]);
  let [currentLevel, setCurrentLevel] = useState(0);
  let [selectedAnswer, setSelectedAnswer] = useState(0); // 0 = not selected
  let [bgColor1, setBgColor1] = useState('transparent');
  let [bgColor2, setBgColor2] = useState('transparent');
  let [bgColor3, setBgColor3] = useState('transparent');
  let [bgColor4, setBgColor4] = useState('transparent');

  // let [difficulty, setDifficulty] = useState(1);
  
  let ref = firebase.firestore().collection('questions_easy');

  function changeGameState() {
    setGameState(++gameState);
  }

  function addHideMoneyClass() {
    const el = document.querySelector('.show-money');

    el.classList.add('hide-money');
};

  function animateStartGame() {
    const startTitleImg = document.querySelector('.start-game img');
    const startWinners = document.querySelector('.winners');
    const startButton = document.querySelector('.start-game button');
    const footer = document.querySelector('.created-by');
    
    startTitleImg.classList.add('move-offscreen-left');
    startWinners.classList.add('move-offscreen-right');
    startButton.classList.add('move-offscreen-down');
    footer.classList.add('move-offscreen-down');
    // changeGameState();
  }

  function resetSelection() {
    setBgColor1('transparent');
    setBgColor2('transparent');
    setBgColor3('transparent');
    setBgColor4('transparent');
  }

  function isAnswerCorrect(num) {
    if(num === questions[currentLevel].answer_correct) {
      if(currentLevel < moneyArr.length - 1) {
        setCurrentLevel(++currentLevel);
      }

      // // getQuestion();

      setMoneyLevel(moneyArr[currentLevel - 1]);

      resetSelection();
    }
  }

  function selectAnswer1() {
    resetSelection();
    setSelectedAnswer(1);
    setBgColor1('orange');

    // check for correct answer
    isAnswerCorrect(1);
  }

  function selectAnswer2() {
    resetSelection();
    setSelectedAnswer(2);
    setBgColor2('orange');
    isAnswerCorrect(2);
  }

  function selectAnswer3() {
    resetSelection();
    setSelectedAnswer(3);
    setBgColor3('orange');
    isAnswerCorrect(3);
  }
  
  function selectAnswer4() {
    resetSelection();
    setSelectedAnswer(4);
    setBgColor4('orange');
    isAnswerCorrect(4);
  }

  function shuffle(arr) {
    arr.sort(function() {
      return Math.random() - 0.5;
    });

    return arr;
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

    console.log(questions);

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
    console.log(snapshot_million.docs.length);

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
    getQuestions();
  }, []);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  if(loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='app'>
      {gameState === 0 ? <StartGame animateElems={animateStartGame} gameStateFlag={changeGameState} /> : null}
      {gameState === 1 ? <PreGame gameStateFlag={changeGameState}/> : null}
      {gameState === 2 ? <ShowMoney gameStateFlag={changeGameState} hidemoney={addHideMoneyClass} money={moneyArr[currentLevel]} /> : null}
      {gameState === 3 ? <Main selectAnswer1={selectAnswer1} selectAnswer2={selectAnswer2} selectAnswer3={selectAnswer3} selectAnswer4={selectAnswer4} bgColor1={bgColor1} bgColor2={bgColor2} bgColor3={bgColor3} bgColor4={bgColor4} currentMoney={moneylevel} question={questions[currentLevel].question} answer1={questions[currentLevel].answer_1} answer2={questions[currentLevel].answer_2} answer3={questions[currentLevel].answer_3} answer4={questions[currentLevel].answer_4} correct={questions[currentLevel].answer_correct} questionID={questions[currentLevel].id} lifeline_fiftyfifty={lifeLineFiftyFifty} lifeline_asktheaudience={lifeLineAskTheAudience} lifeline_phoneafriend={lifeLinePhoneAFriend}/>  : null}
      {gameState === 4 ? <Sidebar /> : null}
    </div>
  );
}

export default App;