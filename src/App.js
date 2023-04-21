// styles
import './styles/App.css';

// components
import StartGame from './components/StartGame';
import ShowPreGameText from './components/ShowPreGameText';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import GameOver from './components/GameOver';
import FinalAnswer from './components/FinalAnswer';
import AnswerPopup from './components/AnswerPopup';
import LifeLineModal from './components/LifeLineModal';
import AskTheAudienceModal from './components/AskTheAudienceModal';
import PhoneAFriendModal from './components/PhoneAFriendModal';
import MillionaireWinner from './components/MillionaireWinner';

import { shuffle, getQuestions } from './utils/utils';

// add firebase
import firebase from './firebase';

// import hooks
import React, { useState, useEffect } from 'react';

// import react-redux hooks
import { useDispatch, useSelector, batch } from 'react-redux';

function App() {
  const moneyArr = ['$100', '$200', '$300', '$500', '$1,000', '$2,000', '$4,000', '$8,000', '$16,000', '$32,000', '$64,000', '$125,000', '$250,000', '$500,000', '$1 MILLION'];
  const questionName = ['questions_easy', 'questions_medium', 'questions_hard', 'questions_million'];

  const loading = useSelector(state => state.loading);
  const sidebarVisible = useSelector(state => state.sidebarVisible);
  const timerInitSeconds = useSelector(state => state.timerInitSeconds);

  const gameState = useSelector(state => state.gameState);
  const answerState = useSelector(state => state.answerState);

  const lifeLineFiftyFifty = useSelector(state => state.lifeLineFiftyFifty);
  const lifeLinePhoneAFriend = useSelector(state => state.lifeLinePhoneAFriend);
  const lifeLineAskTheAudience = useSelector(state => state.lifeLineAskTheAudience);

  const questions = useSelector(state => state.questions);
  // const [questions, setQuestions] = useState([]);

  const moneyLevel = useSelector(state => state.moneyLevel);
  const currentLevel = useSelector(state => state.currentLevel);
  const selectedAnswer = useSelector(state => state.selectedAnswer);
  
  const finalAnswerVisible = useSelector(state => state.finalAnswerVisible);
  const answerMessageOpacity = useSelector(state => state.answerMessageOpacity);
  const answerMessageScale = useSelector(state => state.answerMessageScale);
  const correctAnswerText = useSelector(state => state.correctAnswerText);
  const answerMessageVisible = useSelector(state => state.answerMessageVisible);
  const answerButtonText = useSelector(state => state.answerButtonText);

  // modals

  const viewLifeLineModal = useSelector(state => state.viewLifeLineModal);
  const lifeLineModalImage = useSelector(state => state.lifeLineModalImage);
  const viewAskTheAudienceModal = useSelector(state => state.viewAskTheAudienceModal);
  const viewPhoneAFriendModal = useSelector(state => state.viewPhoneAFriendModal);
  const viewMillionaireWinner = useSelector(state => state.viewMillionaireWinner);

  const friends = useSelector(state => state.friends);
  const lifeLineClickable = useSelector(state => state.lifeLineClickable);

  const dispatch = useDispatch();

  // const useLifeLine = (index) => {

  //       if (index === 0) {
  //         // 50:50 lifeline used
  //         const cor = questions[currentLevel].answer_correct - 1;
    
  //         // fix array so that only incorrect answer indexes are included
  //         const incorrectAnswers = [0, 1, 2, 3];
  //         incorrectAnswers.splice(cor, 1);
    
  //         // randomly choose one of these arrays to stay
  //         const chosenNumber = Math.floor(Math.random() * incorrectAnswers.length);
    
  //         // remove chosenNumber from array leaving only answers that should be hidden
  //         incorrectAnswers.splice(chosenNumber, 1);
    
  //         // get all elements with .lifeline
  //         const answerElems = document.querySelectorAll('.answer');
  //         answerElems[incorrectAnswers[0]].classList.add('hide-answer');
  //         answerElems[incorrectAnswers[1]].classList.add('hide-answer');
  //         answerElems[incorrectAnswers[0]].classList.remove('answer-visible');
  //         answerElems[incorrectAnswers[1]].classList.remove('answer-visible');
    
  //         // disable 50:50 lifeline
  //         dispatch({ type: 'setLifeLineFiftyFifty', amount: 0 });
  //       }
  //       else if (index === 1) {
  //         // Phone A Friend lifeline used
  //         batch(() => {
  //             dispatch({ type: 'toggleViewPhoneAFriendModal' });    
  //             dispatch({ type: 'setLifeLinePhoneAFriend', amount: 0 });
  //         });
  //       }
  //       else {
  //         // Ask The Audience lifeline used
  //         batch(() => {
  //             dispatch({ type: 'toggleViewAskTheAudienceModal' });
  //             dispatch({ type: 'setLifeLineAskTheAudience', amount: 0 });
  //         });
  //       }
  //   }

  const homeScreen = () => {
    dispatch({ type: 'resetGame' });
    getQuestions();
  };

  const changeTimerInitSeconds = (num) => {
    dispatch({ type: 'changeTimerInitSeconds', amount: num });
  }

  const changeViewPhoneAFriend = () => {
    dispatch({ type: 'toggleViewPhoneAFriendModal' });
  }

  const changeViewAskTheAudienceModal = () => {
    dispatch({ type: 'toggleViewAskTheAudienceModal' });
  }

  const hideAskTheAudienceModal = () => {
    dispatch({ type: 'toggleViewAskTheAudienceModal' });
  }

  const changeViewLifeLineModal = index => {
    if (lifeLineClickable) {
      batch(() => {
        dispatch({ type: 'setLifeLineModalImage', imageName: index })
        dispatch({ type: 'toggleViewLifeLineModal' });
      })
    }
  }

  const changeLifelineClickable = () => {
    dispatch({ type: 'toggleLifeLineClickable' });
  }

  const changeTimerVisible = () => {
    dispatch({ type: 'toggleTimerVisible' });
  }

  const changeFinalAnswerVisible = () => {
    dispatch({ type: 'toggleFinalAnswerVisible' });
  }

  const changeGameState = () => {
    dispatch({ type: 'advanceGameState' });
  }

  const changeAnswerState = () => {
    dispatch({ type: 'advanceAnswerState' });
  }

  const nextQuestion = () => {

    if (answerButtonText === 'End Game') {
      dispatch({ type: 'hideAnswerMessageVisible' });
      changeGameState();
      return;
    }

    if (currentLevel < moneyArr.length - 1) {
      dispatch({ type: 'readyForNextQuestion' });
    }

    batch(() => {
      dispatch({ type: 'hideAnswerMessageVisible' });
      dispatch({ type: 'setGameState', amount: 2 });
  
      // reset messages
      dispatch({ type: 'setCorrectAnswerText', text: 'Incorrect' });
      dispatch({ type: 'setAnswerButtonText', text: 'End Game' });

    })
  }

  useEffect(() => {
    dispatch({ type: 'setMoneyLevel', amount: moneyArr[currentLevel]})
  }, [currentLevel]);

  // const storeGamePlayed = async () => {
  //   const totalGamesPlayed = await getStats();
  //   const res = firebase.firestore().collection('stats').doc('games').set({ played: totalGamesPlayed + 1 });
  // }

  /* Phone A Friend - makes a suggestion, which is not always correct. Percentage of correct answer gets less and less as the questions get more difficult */
  const changePhoneAFriendSuggestion = () => {
    let sugg = -1;

    const suggestionCorrectChance = (16 - currentLevel) * 7;
    const suggestionCorrectPCT = Math.floor(Math.random() * 100) + 1;

    if (suggestionCorrectPCT <= suggestionCorrectChance) {
      // guesses the correct answer
      sugg = questions[currentLevel].answer_correct - 1;
    }
    else {
      // guesses an incorrect answer
      const answerElems = document.querySelectorAll('.answer');
      const cor = questions[currentLevel].answer_correct - 1;
      const incorrectAnswersArray = [0, 1, 2, 3];

      // remove correct answer from array leaving only incorrect answers
      incorrectAnswersArray.splice(cor, 1);

      // check to make sure the incorrect answers have not been removed already with the 50:50 lifeline
      for (let i = 0; i < incorrectAnswersArray.length; i++) {
        if (answerElems[i].classList.contains('answer-hidden')) {
          // if there is a match, remove from array
          incorrectAnswersArray.splice(i, 1);
        }
      }

      sugg = Math.floor(Math.random() * incorrectAnswersArray.length);
    }

    return sugg;
  }

  const isAnswerCorrect = (num) => {
    storeAnswerSelected();

    if (num === questions[currentLevel].answer_correct) {

      // if answered the last question, they won!
      if (currentLevel === 14) {
        batch(() => {
          dispatch({ type: 'toggleFinalAnswerVisible '});
          dispatch({ type: 'toggleTimerVisible' });
          dispatch({ type: 'winner' });
          dispatch({ type: 'setCorrectAnswerText', text: 'Correct!' });
        })
        return;
      }
      else {
        batch(() => {
          dispatch({ type: 'toggleFinalAnswerVisible '});
          dispatch({ type: 'toggleTimerVisible' });
          dispatch({ type: 'setAnswerButtonText', text: 'Next Question' });
          dispatch({ type: 'setCorrectAnswerText', text: 'Correct!' });
        })
        showAnswerMessageVisible();
      }

    }

    // incorrect answer
    showAnswerMessageVisible();

  }

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
      const queryRef = await collRef.where('question', '==', questions[currentLevel].question).get();
  
      if (queryRef.empty) {
        console.log('No doc exists.');
      }
      else {
  
        // get id of document
        const docId = queryRef.docs[0].id;
  
        // get value of user_selected answer
        const totalSelected = queryRef.docs[0].data()['user_selected_' + (selectedAnswer + 1)] + 1;
  
        const cityRef = collRef.doc(docId);
  
        const userSel = 'user_selected_' + (selectedAnswer + 1);
  
        const res = cityRef.update({ [userSel]: totalSelected });
  
      }
    } catch (err) {
      console.error(err.message);
    }

  };

  const showAnswerMessageVisible = () => {

    if (answerMessageVisible) {
      batch(() => {
        dispatch({ type: 'toggleAnswerMessageVisible' });
        dispatch({ type: 'setAnswerMessageOpacity', amount: 0 });
        dispatch({ type: 'setAnswerMessageScale', amount: 0 });
      })
    }
    else {
      batch(() => {
        dispatch({ type: 'toggleAnswerMessageVisible' });
        dispatch({ type: 'setAnswerMessageOpacity', amount: 1 });
        dispatch({ type: 'setAnswerMessageScale', amount: 1 });
      })
    }
  }

  const answerSelected = (num) => {
    dispatch({ type: 'setSelectedAnswer', answer: num})
  }

  // function shuffle(originalArray) {
  //   var array = [].concat(originalArray);
  //   var currentIndex = array.length, temporaryValue, randomIndex;
  
  //   // While there remain elements to shuffle...
  //   while (0 !== currentIndex) {
  
  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;
  
  //     // And swap it with the current element.
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }
  
  //   return array;
  // }

  // async function getQuestions() {

  //   dispatch({ type: 'toggleLoading' });

  //   let ref = firebase.firestore().collection('questions_easy');
  //   try {
  //     const snapshot_easy = await ref.get();
  
  //     let items_easy = [];
  
  //     snapshot_easy.forEach(doc => {
  //       items_easy.push(doc.data());
  //     });
  
  //     // shuffle the array
  //     const a = shuffle(items_easy);
  
  //     setQuestions(questions => [...questions, ...a.slice(-5)]);
  //   } catch (err) {
  //     console.error(err.message);
  //   }

  //   // medium questions
  //   ref = firebase.firestore().collection('questions_medium');
  //   try {
  //     const snapshot_medium = await ref.get();
  
  //     const items_medium = [];
  
  //     snapshot_medium.forEach(doc => {
  //       items_medium.push(doc.data());
  //     });
  
  //     // // shuffle the array
  //     shuffle(items_medium);
  
  //     setQuestions(questions => [...questions, ...items_medium.slice(-5)]);
  //   } catch (err) {
  //     console.error(err.message);
  //   }

  //   // // hard questions
  //   ref = firebase.firestore().collection('questions_hard');
  //   try {
  //     const snapshot_hard = await ref.get();
  
  //     const items_hard = [];
  
  //     snapshot_hard.forEach(doc => {
  //       items_hard.push(doc.data());
  //     });
  
  //     // // shuffle the array
  //     shuffle(items_hard);
  
  //     setQuestions(questions => [...questions, ...items_hard.slice(-4)]);
  //   } catch (err) {
  //     console.error(err.message);
  //   }

  //   // // millionaire questions
  //   ref = firebase.firestore().collection('questions_million');
  //   try {
  //     const snapshot_million = await ref.get();
  
  //     const items_million = [];
  
  //     snapshot_million.forEach(doc => {
  //       items_million.push(doc.data());
  //     });
  
  //     setQuestions(a => [...a, ...items_million.slice(-1)]);
  
  //     dispatch({ type: 'toggleLoading' });
  //   } catch (err) {
  //     console.error(err.message);
  //   }

  // }

  useEffect(() => {
    if (selectedAnswer !== null) {

      // show popup for 'Final Answer?'
      changeFinalAnswerVisible();
    }

  }, [selectedAnswer]);

  useEffect(() => {
    if (!finalAnswerVisible) {
      dispatch({ type: 'setSelectedAnswer', answer: null });
    }
  }, [finalAnswerVisible]);

  async function getFriends() {
    let ref = firebase.firestore().collection('Friends');
    try {
      const snapshotFriends = await ref.get();
      const newArr = [];
  
      snapshotFriends.forEach(doc => {
        newArr.push(doc.data());
      });
  
      shuffle(newArr);
  
      dispatch({ type: 'setFriends', friends: newArr.slice(-3)})
      // setFriends(oldArr => [...oldArr, ...newArr.slice(-3)]);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getQuestions();
    getFriends();
  }, []);

  // hide all visible elements except the game over modal if game is over
  useEffect(() => {
    if (gameState === 4) {
      dispatch({ type: 'gameOver' });
    }
  }, [gameState]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='app'>
      {gameState === 0 
        ? <StartGame /> 
        : null}
      {gameState === 1 
        ? <ShowPreGameText
            changeGameState={changeGameState} 
            text='GET READY!' /> 
        : null}
      {gameState === 2
        ? <ShowPreGameText 
            changeGameState={changeGameState} 
            text={moneyArr[currentLevel]} />
        : null }
      {gameState === 3 
        ? <Main
            timerInitSeconds={timerInitSeconds}
            theAnswerState={answerState}
            answerStateFlag={changeAnswerState}
            answers={questions[currentLevel]}
            changeAnswerSelected={answerSelected}
            answerSelected={selectedAnswer}
            questionID={questions[currentLevel].id}
            lifeline_fiftyfifty={lifeLineFiftyFifty}
            lifeline_asktheaudience={lifeLineAskTheAudience}
            lifeline_phoneafriend={lifeLinePhoneAFriend}
            viewLifeLineModal={viewLifeLineModal}
            changeViewLifeLineModal={changeViewLifeLineModal}
            viewAskTheAudienceModal={viewAskTheAudienceModal}
            changeViewAskTheAudienceModal={changeViewAskTheAudienceModal}/> 
        : null}
      {gameState >= 1 && sidebarVisible 
        ? <Sidebar 
            money={moneyArr} 
            currentLevel={currentLevel} /> 
        : null}

      {finalAnswerVisible 
        ? <FinalAnswer
            changeVisible={changeFinalAnswerVisible}
            isAnswerCorrect={isAnswerCorrect}
            cancelSelected={answerSelected}
            answers={questions[currentLevel]}
            answerSelected={selectedAnswer} /> 
        : null}

      {answerMessageVisible 
        ? <AnswerPopup
            correctAnswerText={correctAnswerText}
            op={answerMessageOpacity}
            sc={answerMessageScale}
            answers={questions[currentLevel]}
            correctAnswer={questions[currentLevel].answer_correct}
            answer_popup_button={answerButtonText}
            nextQuestion={nextQuestion} /> 
        : null}

      {viewLifeLineModal 
        ? <LifeLineModal /> 
        : null}

      {viewAskTheAudienceModal 
        ? <AskTheAudienceModal 
            answer={questions[currentLevel]} 
            hideAskTheAudienceModal={hideAskTheAudienceModal} 
            changeViewAskTheAudienceModal={changeViewAskTheAudienceModal} /> 
        : null}

      {viewPhoneAFriendModal 
        ? <PhoneAFriendModal 
            changeLifeLineClickable={changeLifelineClickable} 
            changeTimerVisible={changeTimerVisible} 
            changeTimerInitSeconds={changeTimerInitSeconds} 
            answers={questions[currentLevel]} 
            changePhoneAFriendSuggestion={changePhoneAFriendSuggestion} 
            friends={friends} 
            changeViewPhoneAFriendModal={changeViewPhoneAFriend} /> 
        : null}

      {gameState === 4 
        ? <GameOver 
            homeScreen={homeScreen} 
            level={moneyArr[currentLevel]} /> 
        : null}

      {viewMillionaireWinner 
        ? <MillionaireWinner homeScreen={homeScreen} />
        : null}
    </div>
  );
}

export default App;
