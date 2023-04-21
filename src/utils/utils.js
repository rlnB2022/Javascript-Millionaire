import firebase from '../firebase';
import store from '../stores/GameStore';

export const getWinners = async () => {
    let ref = firebase.firestore().collection('winners').orderBy('date', 'desc');
    try {
      const snapshotRecentWinners = await ref.get();
      const newArray = [];

      snapshotRecentWinners.forEach(doc => {
        newArray.push(doc.data());
      });

      return newArray;
    } catch (err) {
      console.error(err.message);
    }
}

export const getStats = async () => {
    const statRef = firebase.firestore().collection('stats');
    try {
      const snapshot_totalgames = await statRef.get();
      const gamesPlayed = snapshot_totalgames.docs[0].data().played;
  
      return gamesPlayed;
    } catch (err) {
      console.error(err.message);
    }
  }

  export const storeGamePlayed = async () => {
    const totalGamesPlayed = await getStats();
    const res = firebase.firestore().collection('stats').doc('games').set({ played: totalGamesPlayed + 1 });
  }

  export const getQuestions = async () => {

    store.dispatch({ type: 'toggleLoading' });

    let ref = firebase.firestore().collection('questions_easy');
    try {
      const snapshot_easy = await ref.get();
  
      let items_easy = [];
  
      snapshot_easy.forEach(doc => {
        items_easy.push(doc.data());
      });
  
      // shuffle the array
      const a = shuffle(items_easy);
  
      store.dispatch({ type: 'storeQuestions', questions: a.slice(-5) })
      // setQuestions(questions => [...questions, ...a.slice(-5)]);
    } catch (err) {
      console.error(err.message);
    }

    // medium questions
    // ref = firebase.firestore().collection('questions_medium');
    // try {
    //   const snapshot_medium = await ref.get();
  
    //   const items_medium = [];
  
    //   snapshot_medium.forEach(doc => {
    //     items_medium.push(doc.data());
    //   });
  
    //   // // shuffle the array
    //   shuffle(items_medium);
  
    //   setQuestions(questions => [...questions, ...items_medium.slice(-5)]);
    // } catch (err) {
    //   console.error(err.message);
    // }

    // // // hard questions
    // ref = firebase.firestore().collection('questions_hard');
    // try {
    //   const snapshot_hard = await ref.get();
  
    //   const items_hard = [];
  
    //   snapshot_hard.forEach(doc => {
    //     items_hard.push(doc.data());
    //   });
  
    //   // // shuffle the array
    //   shuffle(items_hard);
  
    //   setQuestions(questions => [...questions, ...items_hard.slice(-4)]);
    // } catch (err) {
    //   console.error(err.message);
    // }

    // // // millionaire questions
    // ref = firebase.firestore().collection('questions_million');
    // try {
    //   const snapshot_million = await ref.get();
  
    //   const items_million = [];
  
    //   snapshot_million.forEach(doc => {
    //     items_million.push(doc.data());
    //   });
  
    //   setQuestions(a => [...a, ...items_million.slice(-1)]);
  
      store.dispatch({ type: 'toggleLoading' });
    // } catch (err) {
    //   console.error(err.message);
    // }

  }

  export const shuffle = (originalArray) => {
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