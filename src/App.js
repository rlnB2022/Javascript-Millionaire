import './App.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import firebase from './firebase';
import React, { useState, useEffect } from 'react';
import Question from './components/Question';

function App() {
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection('questions');

  function getQuestion() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      // const items = [];

      // console.log(querySnapshot.docs[0].data());

      // querySnapshot.forEach(doc => {
      //   const data = doc.data();
      //   items.push(data);
      // });

      setQuestion(querySnapshot.docs[0].data());
      setLoading(false);
    })
  }

  useEffect(() => {
    getQuestion();
  }, []);

  if(loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="app">
      <Main question={question.question} answer1={question.answer1} answer2={question.answer2} answer3={question.answer3} answer4={question.answer4} correct={question.correct} questionID={question.id}/>
      <Sidebar />
    </div>
  );
}

export default App;
