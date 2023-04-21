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

      const items_easy = [];
    
      /* Store the easy questions in an array */
      snapshot_easy.forEach(doc => {
        items_easy.push(doc.data());
      });
  
      // shuffle the array
      const shuffledItems = shuffle(items_easy);
  
      store.dispatch({ type: 'storeQuestions', questions: shuffledItems.slice(-5) })
    } catch (err) {
      console.error(err.message);
    }

    // medium questions
    ref = firebase.firestore().collection('questions_medium');
    try {
      const snapshot_medium = await ref.get();

      const items_medium = [];
    
      /* Store the medium questions in an array */
      snapshot_medium.forEach(doc => {
        items_medium.push(doc.data());
      });
  
      // // shuffle the array
      const shuffledItems = shuffle(items_medium);
  
      store.dispatch({ type: 'storeQuestions', questions: shuffledItems.slice(-5) })
    } catch (err) {
      console.error(err.message);
    }

    // // // hard questions
    ref = firebase.firestore().collection('questions_hard');
    try {
      const snapshot_hard = await ref.get();

      const items_hard = [];
    
      /* Store the hard questions in an array */
      snapshot_hard.forEach(doc => {
        items_hard.push(doc.data());
      });
  
      // // shuffle the array
      const shuffledItems = shuffle(items_hard);
  
      store.dispatch({ type: 'storeQuestions', questions: shuffledItems.slice(-4) })
    } catch (err) {
      console.error(err.message);
    }

    // // // millionaire questions
    ref = firebase.firestore().collection('questions_million');
    try {
      const snapshot_million = await ref.get();

      const items_million = [];
  
      /* Store the million dollar question in an array by itself */
      snapshot_million.forEach(doc => {
        items_million.push(doc.data());
      });
  
      store.dispatch({ type: 'storeQuestions', questions: items_million.slice(-1) })
        store.dispatch({ type: 'toggleLoading' });
    } catch (err) {
      console.error(err.message);
    }
  }

  export const shuffle = (originalArray) => {
    let array = [].concat(originalArray);
    let currentIndex = array.length, temporaryValue, randomIndex;
  
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