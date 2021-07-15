import './App.css';
import StartGame from './components/StartGame';
import PreGame from './components/PreGame';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
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

  function isAnswerCorrect(num) {
    // if(num === question.answer_correct) {
    //   if(currentLevel < moneyArr.length - 1) {
    //     setCurrentLevel(++currentLevel);
    //   }

    //   if(currentLevel <= 5) {
    //     setDifficulty(++difficulty);
    //   }

    //   // getQuestion();

    //   setMoneyLevel(moneyArr[currentLevel - 1]);

    //   resetSelection();
    // }
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
    let currentIndex = arr.length, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex], arr[currentIndex]];
    }

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

    console.log(items_easy);

    // get random question
    // const randomIndex = Math.floor(Math.random() * items.length);

    setQuestions([...questions, items_easy]);

    // medium questions
    ref = firebase.firestore().collection('questions_medium');
    const snapshot_medium = await ref.limit(5).get();

    // ref.where('difficulty', '==', difficulty).onSnapshot(querySnapshot => {
    const items_medium = [];

    snapshot_medium.forEach(doc => {
      items_medium.push(doc.data());
    });

    // shuffle the array
    shuffle(items_medium);

    console.log(items_medium);

    setQuestions([...questions, items_medium]);

    // hard questions
    ref = firebase.firestore().collection('questions_hard');
    const snapshot_hard = await ref.limit(5).get();

    // ref.where('difficulty', '==', difficulty).onSnapshot(querySnapshot => {
    const items_hard = [];

    snapshot_hard.forEach(doc => {
      items_hard.push(doc.data());
    });

    // shuffle the array
    shuffle(items_hard);

    console.log(items_hard);

    setQuestions([...questions, items_hard]);

    // millionaire questions
    ref = firebase.firestore().collection('questions_million');
    const snapshot_million = await ref.get();

    // ref.where('difficulty', '==', difficulty).onSnapshot(querySnapshot => {
    console.log(snapshot_million.docs.length);

    let randomMillionQuestion = Math.floor(Math.random() * snapshot_million.docs.length);

    const items_million = [];

    snapshot_million.forEach(doc => {
      items_million.push(doc.data());
    });

    console.log(items_million[randomMillionQuestion]);

    setQuestions([...questions, items_million[0]]);

    setLoading(false);
    // });

  }

  useEffect(() => {
    getQuestions();
  }, []);

  if(loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='app'>
      {gameState === 0 ? <StartGame gameStateFlag={changeGameState} /> : null}
      {gameState === 1 ? <PreGame gameStateFlag={changeGameState}/> : null}
      {gameState === 2 ? <Main selectAnswer1={selectAnswer1} selectAnswer2={selectAnswer2} selectAnswer3={selectAnswer3} selectAnswer4={selectAnswer4} bgColor1={bgColor1} bgColor2={bgColor2} bgColor3={bgColor3} bgColor4={bgColor4} currentMoney={moneylevel} question={questions.question} answer1={questions.answer_1} answer2={questions.answer_2} answer3={questions.answer_3} answer4={questions.answer_4} correct={questions.answer_correct} questionID={questions.id} lifeline_fiftyfifty={lifeLineFiftyFifty} lifeline_asktheaudience={lifeLineAskTheAudience} lifeline_phoneafriend={lifeLinePhoneAFriend}/>  : null}
      {gameState === 2 ? <Sidebar /> : null}
    </div>
  );
}

export default App;
