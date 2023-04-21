import firebase from '../firebase';

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