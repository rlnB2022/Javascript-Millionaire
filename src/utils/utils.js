import firebase from "../firebase";
import store from "../stores/GameStore";

export const getWinners = async () => {
	let ref = firebase.firestore().collection("winners").orderBy("date", "desc");
	try {
		const snapshotRecentWinners = await ref.get();
		const newArray = [];

		snapshotRecentWinners.forEach((doc) => {
			newArray.push(doc.data());
		});

		return newArray;
	} catch (err) {
		console.error(err.message);
	}
};

export const getStats = async () => {
	const statRef = firebase.firestore().collection("stats");
	try {
		const snapshot_totalgames = await statRef.get();
		const gamesPlayed = snapshot_totalgames.docs[0].data().played;

		return gamesPlayed;
	} catch (err) {
		console.error(err.message);
	}
};

export const storeGamePlayed = async () => {
	const totalGamesPlayed = await getStats();
	const res = firebase
		.firestore()
		.collection("stats")
		.doc("games")
		.set({ played: totalGamesPlayed + 1 });
};

export const getQuestions = async () => {
	store.dispatch({ type: "toggleLoading" });

	let ref = firebase.firestore().collection("questions_easy");
	try {
		const snapshot_easy = await ref.get();

		// map through the snapshot and only get the last 5 questions from the array
		const items_easy = shuffle(
			snapshot_easy.docs.map((doc) => doc.data())
		).slice(-5);

		store.dispatch({
			type: "storeQuestions",
			questions: items_easy,
		});
	} catch (err) {
		console.error(err.message);
	}

	// medium questions
	ref = firebase.firestore().collection("questions_medium");
	try {
		const snapshot_medium = await ref.get();

		// map through the snapshot and only get the last 5 questions from the array
		const items_medium = shuffle(
			snapshot_medium.docs.map((doc) => doc.data())
		).slice(-5);

		store.dispatch({
			type: "storeQuestions",
			questions: items_medium,
		});
	} catch (err) {
		console.error(err.message);
	}

	// // // hard questions
	ref = firebase.firestore().collection("questions_hard");
	try {
		const snapshot_hard = await ref.get();

		// map through the snapshot and only get the last 5 questions from the array
		const items_hard = shuffle(
			snapshot_hard.docs.map((doc) => doc.data())
		).slice(-4);

		store.dispatch({
			type: "storeQuestions",
			questions: items_hard,
		});
	} catch (err) {
		console.error(err.message);
	}

	// // // millionaire questions
	ref = firebase.firestore().collection("questions_million");
	try {
		const snapshot_million = await ref.get();

		// map through the snapshot and only get the last 5 questions from the array
		const items_million = shuffle(
			snapshot_million.docs.map((doc) => doc.data())
		).slice(-1);

		store.dispatch({
			type: "storeQuestions",
			questions: items_million,
		});
		store.dispatch({ type: "toggleLoading" });
	} catch (err) {
		console.error(err.message);
	}
};

export const getFriends = async () => {
	let ref = firebase.firestore().collection("Friends");
	try {
		const snapshotFriends = await ref.get();
		const newArr = [];

		snapshotFriends.forEach((doc) => {
			newArr.push(doc.data());
		});

		store.dispatch({ type: "setFriends", friends: newArr });
	} catch (err) {
		console.error(err.message);
	}
};

export const shuffle = (originalArray) => {
	let array = [].concat(originalArray);
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

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
};
