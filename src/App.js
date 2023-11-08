// styles
import "./styles/App.css";

// components
import StartGame from "./components/StartGame/StartGame";
import ShowPreGameText from "./components/ShowPreGameText";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import GameOver from "./components/GameOver";
import FinalAnswer from "./components/FinalAnswer";
import AnswerPopup from "./components/AnswerPopup";
import LifeLineModal from "./components/LifeLineModal";
import AskTheAudienceModal from "./components/AskTheAudienceModal";
import PhoneAFriendModal from "./components/PhoneAFriendModal";
import MillionaireWinner from "./components/MillionaireWinner";

import { getFriends, getQuestions } from "./utils/utils";

// add firebase
import firebase from "./firebase";

// import hooks
import React, { useEffect } from "react";

// import react-redux hooks
import { useDispatch, useSelector, batch } from "react-redux";

function App() {
	const moneyArr = [
		"$100",
		"$200",
		"$300",
		"$500",
		"$1,000",
		"$2,000",
		"$4,000",
		"$8,000",
		"$16,000",
		"$32,000",
		"$64,000",
		"$125,000",
		"$250,000",
		"$500,000",
		"$1 MILLION",
	];
	const questionName = [
		"questions_easy",
		"questions_medium",
		"questions_hard",
		"questions_million",
	];

	const loading = useSelector((state) => state.loading);
	const gameState = useSelector((state) => state.gameState);
	const currentLevel = useSelector((state) => state.currentLevel);

	const questions = useSelector((state) => state.questions);

	const selectedAnswer = useSelector((state) => state.selectedAnswer);
	const finalAnswerVisible = useSelector((state) => state.finalAnswerVisible);
	const answerMessageVisible = useSelector(
		(state) => state.answerMessageVisible
	);
	const answerButtonText = useSelector((state) => state.answerButtonText);

	// modals

	const viewLifeLineModal = useSelector((state) => state.viewLifeLineModal);
	const viewAskTheAudienceModal = useSelector(
		(state) => state.viewAskTheAudienceModal
	);
	const viewPhoneAFriendModal = useSelector(
		(state) => state.viewPhoneAFriendModal
	);
	const viewMillionaireWinner = useSelector(
		(state) => state.viewMillionaireWinner
	);

	const dispatch = useDispatch();

	const homeScreen = () => {
		dispatch({ type: "resetGame" });
		getQuestions();
	};

	const nextQuestion = () => {
		dispatch({ type: "hideAnswerMessageVisible" });
		dispatch({ type: "changeTimerInitSeconds", amount: 30 });

		if (answerButtonText === "End Game") {
			dispatch({ type: "advanceGameState" });
			return;
		}

		if (currentLevel < moneyArr.length - 1) {
			dispatch({ type: "readyForNextQuestion" });
		}

		batch(() => {
			dispatch({ type: "setGameState", amount: 2 });
			dispatch({ type: "toggleFinalAnswerVisible" });

			// reset messages
			dispatch({ type: "setCorrectAnswerText", text: "Incorrect" });
			dispatch({ type: "setAnswerButtonText", text: "End Game" });
		});
	};

	useEffect(() => {
		dispatch({ type: "setMoneyLevel", amount: moneyArr[currentLevel] });
	}, [currentLevel]);

	/* Phone A Friend - makes a suggestion, which is not always correct. Percentage of correct answer gets less and less as the questions get more difficult */
	const changePhoneAFriendSuggestion = () => {
		let sugg = -1;

		const suggestionCorrectChance = (16 - currentLevel) * 7;
		const suggestionCorrectPCT = Math.floor(Math.random() * 100) + 1;

		if (suggestionCorrectPCT <= suggestionCorrectChance) {
			// guesses the correct answer
			sugg = questions[currentLevel].answer_correct - 1;
		} else {
			// guesses an incorrect answer
			const answerElems = document.querySelectorAll(".answer");
			const cor = questions[currentLevel].answer_correct - 1;
			const incorrectAnswersArray = [0, 1, 2, 3];

			// remove correct answer from array leaving only incorrect answers
			incorrectAnswersArray.splice(cor, 1);

			// check to make sure the incorrect answers have not been removed already with the 50:50 lifeline
			for (let i = 0; i < incorrectAnswersArray.length; i++) {
				if (answerElems[i].classList.contains("answer-hidden")) {
					// if there is a match, remove from array
					incorrectAnswersArray.splice(i, 1);
				}
			}

			sugg = Math.floor(Math.random() * incorrectAnswersArray.length);
		}

		return sugg;
	};

	const isAnswerCorrect = (num) => {
		storeAnswerSelected();

		if (num === questions[currentLevel].answer_correct) {
			// if the last question was answered correctly, they won!
			if (currentLevel === 14) {
				batch(() => {
					dispatch({ type: "toggleFinalAnswerVisible " });
					dispatch({ type: "toggleTimerVisible" });
					dispatch({ type: "winner" });
					dispatch({ type: "setCorrectAnswerText", text: "Correct!" });
				});
				return;
			} else {
				batch(() => {
					dispatch({ type: "toggleFinalAnswerVisible " });
					dispatch({ type: "toggleTimerVisible" });
					dispatch({ type: "setAnswerButtonText", text: "Next Question" });
					dispatch({ type: "setCorrectAnswerText", text: "Correct!" });
				});
				showAnswerMessageVisible();
				return;
			}
		}

		// incorrect answer
		showAnswerMessageVisible();
	};

	const getDifficultyName = () => {
		return questionName[Math.floor((currentLevel + 1) / 5)];
	};

	async function storeAnswerSelected() {
		// get name of question difficulty
		const diff = getDifficultyName();

		// get reference to collection
		const collRef = firebase.firestore().collection(diff);

		try {
			// query collection for specific document
			const queryRef = await collRef
				.where("question", "==", questions[currentLevel].question)
				.get();

			if (queryRef.empty) {
				console.warn("No doc exists.");
			} else {
				// get id of document
				const docId = queryRef.docs[0].id;

				// get value of user_selected answer
				const totalSelected =
					queryRef.docs[0].data()["user_selected_" + (selectedAnswer + 1)] + 1;

				const cityRef = collRef.doc(docId);

				const userSel = "user_selected_" + (selectedAnswer + 1);

				const res = cityRef.update({ [userSel]: totalSelected });
			}
		} catch (err) {
			console.error(err.message);
		}
	}

	const showAnswerMessageVisible = () => {
		if (answerMessageVisible) {
			batch(() => {
				dispatch({ type: "toggleAnswerMessageVisible" });
				dispatch({ type: "setAnswerMessageOpacity", amount: 0 });
				dispatch({ type: "setAnswerMessageScale", amount: 0 });
			});
		} else {
			batch(() => {
				dispatch({ type: "toggleAnswerMessageVisible" });
				dispatch({ type: "setAnswerMessageOpacity", amount: 1 });
				dispatch({ type: "setAnswerMessageScale", amount: 1 });
			});
		}
	};

	useEffect(() => {
		if (selectedAnswer !== null) {
			// show popup for 'Final Answer?'
			dispatch({ type: "toggleFinalAnswerVisible" });
		}
	}, [selectedAnswer]);

	useEffect(() => {
		if (!finalAnswerVisible) {
			dispatch({ type: "setSelectedAnswer", answer: null });
		}
	}, [finalAnswerVisible]);

	useEffect(() => {
		getQuestions();
		getFriends();
	}, []);

	// hide all visible elements except the game over modal if game is over
	useEffect(() => {
		if (gameState === 4) {
			dispatch({ type: "gameOver" });
		}
	}, [gameState]);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="app">
			{gameState === 0 && <StartGame />}
			{gameState === 1 && <ShowPreGameText text="GET READY!" />}
			{gameState === 2 && <ShowPreGameText text={moneyArr[currentLevel]} />}
			{gameState === 3 && (
				<Main
					answerSelected={selectedAnswer}
					questionID={questions[currentLevel].id}
				/>
			)}
			{gameState === 4 && (
				<GameOver homeScreen={homeScreen} level={moneyArr[currentLevel]} />
			)}

			{gameState >= 1 && <Sidebar moneyArr={moneyArr} />}
			{finalAnswerVisible && <FinalAnswer isAnswerCorrect={isAnswerCorrect} />}
			{viewLifeLineModal && <LifeLineModal />}

			{answerMessageVisible && <AnswerPopup nextQuestion={nextQuestion} />}

			{viewAskTheAudienceModal && <AskTheAudienceModal />}

			{viewPhoneAFriendModal ? (
				<PhoneAFriendModal
					changePhoneAFriendSuggestion={changePhoneAFriendSuggestion}
				/>
			) : null}

			{viewMillionaireWinner && <MillionaireWinner homeScreen={homeScreen} />}
		</div>
	);
}

export default App;
