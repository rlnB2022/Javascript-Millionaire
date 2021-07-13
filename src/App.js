import './App.css';
import StartGame from './components/StartGame';
import PreGame from './components/PreGame';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import firebase from './firebase';
import React, { useState, useEffect } from 'react';

function App() {
  const moneyArr = ['$100', '$200', '$300', '$500', '$1,000', '$2,000', '$4,000', '$8,000', '$16,000', '$32,000', '$64,000', '$125,000', '$250,000', '$500,000', '$1 MILLION'];

  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  let [gameState, setGameState] = useState(0);
  let [lifeLineFiftyFifty, setLifeLineFiftyFifty] = useState(1); // 1 = available
  let [lifeLinePhoneAFriend, setLifeLinePhoneAFriend] = useState(1); // 1 = available
  let [lifeLineAskTheAudience, setLifeLineAskTheAudience] = useState(1); // 1 = available
  let [moneylevel, setMoneyLevel] = useState(moneyArr[0]);
  let [currentLevel, setCurrentLevel] = useState(1);
  let [selectedAnswer, setSelectedAnswer] = useState(0); // 0 = not selected
  let [bgColor1, setBgColor1] = useState('transparent');
  let [bgColor2, setBgColor2] = useState('transparent');
  let [bgColor3, setBgColor3] = useState('transparent');
  let [bgColor4, setBgColor4] = useState('transparent');
  let [difficulty, setDifficulty] = useState(1);

  let ref = firebase.firestore().collection('questions_easy');

  function changeGameState() {
    setGameState(++gameState);
  }

  function resetSelection() {
    setBgColor1('transparent');
    setBgColor2('transparent');
    setBgColor3('transparent');
    setBgColor4('transparent');
  }

  function selectAnswer1() {
    resetSelection();
    setSelectedAnswer(1);
    setBgColor1('orange');
  }
  function selectAnswer2() {
    resetSelection();
    setSelectedAnswer(2);
    setBgColor2('orange');
  }
  function selectAnswer3() {
    resetSelection();
    setSelectedAnswer(3);
    setBgColor3('orange');
  }
  function selectAnswer4() {
    resetSelection();
    setSelectedAnswer(4);
    setBgColor4('orange');
  }

  async function getQuestion() {
    setLoading(true);

    if(difficulty === 1) {
      ref = firebase.firestore().collection('questions_easy');
    }
    else if(difficulty === 2) {
      ref = firebase.firestore().collection('questions_medium');
    }
    else {
      ref = firebase.firestore().collection('questions_hard');
    }

    const snapshot = await ref.get();

    // ref.where('difficulty', '==', difficulty).onSnapshot(querySnapshot => {
    const items = [];

    snapshot.forEach(doc => {
      items.push(doc.data());
    });

    // get random question
    const randomIndex = Math.floor(Math.random() * items.length);

    setQuestion(items[randomIndex]);
    setLoading(false);
    // });

  }

  useEffect(() => {
    getQuestion();
  }, []);

  if(loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='app'>
      {gameState === 0 ? <StartGame gameStateFlag={changeGameState} /> : null}
      {gameState === 1 ? <PreGame gameStateFlag={changeGameState}/> : null}
      {gameState === 2 ? <Main selectAnswer1={selectAnswer1} selectAnswer2={selectAnswer2} selectAnswer3={selectAnswer3} selectAnswer4={selectAnswer4} bgColor1={bgColor1} bgColor2={bgColor2} bgColor3={bgColor3} bgColor4={bgColor4} currentMoney={moneylevel} question={question.question} answer1={question.answer_1} answer2={question.answer_2} answer3={question.answer_3} answer4={question.answer_4} correct={question.answer_correct} questionID={question.id} lifeline_fiftyfifty={lifeLineFiftyFifty} lifeline_asktheaudience={lifeLineAskTheAudience} lifeline_phoneafriend={lifeLinePhoneAFriend}/>  : null}
      {gameState === 2 ? <Sidebar /> : null}
    </div>
  );
}

export default App;
