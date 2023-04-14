import firebase from '../firebase';

export async function getWinners() {
    let ref = firebase.firestore().collection('winners');
    try {
      const snapshotRecentWinners = await ref.get();
      const newArray = [];

      snapshotRecentWinners.forEach(doc => {
        newArray.push(doc.data());
      });

      return newArray;
  
    //   setWinners(oldArray => [...oldArray, ...newArray]);
    } catch (err) {
      console.error(err.message);
    }
}