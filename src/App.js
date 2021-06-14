import './App.css';
import StartGame from './components/StartGame';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import firebase from './firebase';
import React, { useState, useEffect } from 'react';

function App() {
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(true);

  const ref = firebase.firestore().collection('questions');

  function changeGameOver() {
    setGameOver(false);
  }

  function getQuestion() {
    setLoading(true);

    ref.where('difficulty', '==', 1).onSnapshot(querySnapshot => {
      const items = [];
      querySnapshot.forEach(doc => {
        items.push(doc.data());
      });

      // get random question
      const randomIndex = Math.floor(Math.random() * items.length);

      setQuestion(items[randomIndex]);
      setLoading(false);
    });

  }

  useEffect(() => {
    getQuestion();
  }, []);

  if(loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='app'>
      {gameOver ? <StartGame gameOverFlag={changeGameOver} /> : null}
      {!gameOver ? <Main question={question.question} answer1={question.answer1} answer2={question.answer2} answer3={question.answer3} answer4={question.answer4} correct={question.correct} questionID={question.id}/>  : null}
      {!gameOver ? <Sidebar /> : null}
    </div>
  );
}

export default App;
