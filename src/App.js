import './App.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import firebase from './firebase';
import React, { useState, useEffect } from 'react';

function App() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection('schools');

  function getSchools() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        items.push(data);
      });
      setSchools(items);
      setLoading(false);
    })
  }

  useEffect(() => {
    getSchools();
  }, []);

  if(loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="app">
      {schools.map(school => {
        return (
          <div key={school.id}>
            <h2>{school.title}</h2>
            <p>{school.desc}</p>
          </div>
        )
      })}
      <Main />
      <Sidebar />
    </div>
  );
}

export default App;
