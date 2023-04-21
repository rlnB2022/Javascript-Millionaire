import { createStore } from 'redux';

// create the initial state of the store
const initialState = {
    questions: [],
    loading: false,
    siderbarVisible: false,
    gameState: 0,
    mainState: 0,
    answerState: 0,
    lifeLineFiftyFifty: 1,
    lifeLinePhoneAFriend: 1,
    lifeLineAskTheAudience: 1,
    moneyLevel: 0,
    currentLevel: 0,
    selectedAnswer: null,
    timerVisible: false,
    timerInitSeconds: 0,
    finalAnswerVisible: false,
    answerMessageOpacity: 0,
    answerMessageScale: 0,
    correctAnswerText: 'Incorrect',
    answerMessageVisible: false,
    answerButtonText: 'End Game',
    viewLifeLineModal: false,
    lifelineModalImage: 0,
    viewAskTheAudienceModal: false,
    viewPhoneAFriendModal: false,
    viewMillionaireWinner: false,
    friends: [],
    lifeLineClickable: false
};

// Create the Reducer Function to pass to the store
const storeReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'resetGame':
            return {
                ...state,
                gameState: 0,
                mainState: 0,
                lifelineFiftyFifty: 1,
                lifelinePhoneAFriend: 1,
                lifelineAskTheAudience: 1,
                currentLevel: 0,
                lifeLineClickable: false,
                viewMillionaireWinner: false,
                questions: []
            }
        case 'gameOver':
            return {
                ...state,
                finalAnswerVisible: false,
                answerMessageVisible: false,
                viewAskTheAudienceModal: false,
                viewPhoneAFriendModal: false,
                siderbarVisible: false
            }
        case 'winner':
            return {
                ...state,
                gameState: 5,
                finalAnswerVisible: false,
                answerMessageVisible: false,
                viewLifeLineModal: false,
                viewAskTheAudienceModal: false,
                viewPhoneAFriendModal: false,
                viewMillionaireWinner: true,
                siderbarVisible: false
            }
        case 'toggleLoading':
            return {
                ...state,
                loading: !state.loading
            }
        case 'updateSidebar':
            return {
                ...state,
                siderbarVisible: !state.siderbarVisible
            }
        case 'changeTimerInitSeconds':
            return {
                ...state,
                timerInitSeconds: action.amount
            }
        case 'advanceGameState':
            return {
                ...state,
                gameState: state.gameState + 1
            }
        case 'advanceMainState':
            return {
                ...state,
                mainState: state.mainState + 1
            }
        case 'advanceAnswerState':
            return {
                ...state,
                answerState: state.answerState + 1
            }
        case 'hideAnswerMessageVisible':
            return {
                ...state,
                hideAnswerMessageVisible: false
            }
        case 'readyForNextQuestion':
            return {
                ...state,
                currentLevel: state.currentLevel + 1,
                selectedAnswer: null,
                mainState: 0,
                answerState: 0,
                lifeLineClickable: false
            }
        case 'setGameState':
            return {
                ...state,
                gameState: action.amount
            }
        case 'setCorrectAnswerText':
            return {
                ...state,
                correctAnswerText: action.text
            }
        case 'setAnswerButtonText':
            return {
                ...state,
                answerButtonText: action.text
            }
        case 'toggleViewPhoneAFriendModal':
            return {
                ...state,
                viewPhoneAFriendModal: !state.viewPhoneAFriendModal
            }
        case 'setLifeLineFiftyFifty':
            return {
                ...state,
                lifelineFiftyFifty: action.amount
            }
        case 'setLifeLinePhoneAFriend':
            return {
                ...state,
                lifelinePhoneAFriend: action.amount
            }
        case 'setLifeLineAskTheAudience':
            return {
                ...state,
                lifelineAskTheAudience: action.amount
            }
        case 'setLifeLineModalImage':
            return {
                ...state,
                lifeLineImage: action.idx
            }
        case 'toggleViewAskTheAudienceModal':
            return {
                ...state,
                viewAskTheAudienceModal: !state.viewAskTheAudienceModal
            }
        case 'setSelectedAnswer':
            return {
                ...state,
                selectedAnswer: action.answer
            }
        case 'setMoneyLevel':
            return {
                ...state,
                moneyLevel: action.amount
            }
        case 'toggleTimerVisible':
            return {
                ...state,
                timerVisible: !state.timerVisible
            }
        case 'toggleFinalAnswerVisible':
            return {
                ...state,
                finalAnswerVisible: !state.finalAnswerVisible
            }
        case 'toggleAnswerMessageVisible':
            return {
                ...state,
                answerMessageVisible: !state.answerMessageVisible
            }
        case 'setAnswerMessageOpacity':
            return {
                ...state,
                answerMessageOpacity: action.amount
            }
        case 'setAnswerMessageScale':
            return {
                ...state,
                answerMessageScale: action.amount
            }
        case 'toggleViewLifeLineModal':
            return {
                ...state,
                viewLifeLineModal: !state.viewLifeLineModal
            }
        case 'toggleLifeLineClickable':
            return {
                ...state,
                lifeLineClickable: !state.lifeLineClickable
            }
        case 'setFriends':
            return {
                ...state,
                friends: action.friends
            }
        default:
            return state;
    }
}

// Create the store
const GameStore = createStore(storeReducer);

export default GameStore;