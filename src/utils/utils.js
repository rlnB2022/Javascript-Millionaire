import firebase from '../firebase';

export async function getWinners() {
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

export async function getStats() {
    const statRef = firebase.firestore().collection('stats');
    try {
      const snapshot_totalgames = await statRef.get();
      const gamesPlayed = snapshot_totalgames.docs[0].data().played;
  
      return gamesPlayed;
    } catch (err) {
      console.error(err.message);
    }
  }