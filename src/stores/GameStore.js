import { createStore } from 'redux';

// create the initial state of the store
const initialState = {
    questions: [],
    loading: false,
    sidebarVisible: false,
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
    correctAnswerText: 'Incorrect',
    answerMessageVisible: false,
    answerButtonText: 'End Game',
    viewLifeLineModal: false,
    lifeLineModalImageIndex: 0,
    viewAskTheAudienceModal: false,
    viewPhoneAFriendModal: false,
    viewMillionaireWinner: false,
    friends: [],
    lifeLineClickable: false,
    visibleAnswers: [0, 1, 2, 3]
};

// Create the Reducer Function to pass to the store
const storeReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'resetGame':
            return {
                questions: [],
                loading: false,
                sidebarVisible: false,
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
                correctAnswerText: 'Incorrect',
                answerMessageVisible: false,
                answerButtonText: 'End Game',
                viewLifeLineModal: false,
                lifeLineModalImageIndex: 0,
                viewAskTheAudienceModal: false,
                viewPhoneAFriendModal: false,
                viewMillionaireWinner: false,
                friends: [],
                lifeLineClickable: false,
                visibleAnswers: [0, 1, 2, 3]

            }
        case 'gameOver':
            return {
                ...state,
                finalAnswerVisible: false,
                answerMessageVisible: false,
                viewAskTheAudienceModal: false,
                viewPhoneAFriendModal: false,
                sidebarVisible: false
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
                sidebarVisible: false
            }
        case 'toggleLoading':
            return {
                ...state,
                loading: !state.loading
            }
        // case 'updateSidebar':
        //     return {
        //         ...state,
        //         sidebarVisible: !state.sidebarVisible
        //     }
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
                answerMessageVisible: false
            }
        case 'readyForNextQuestion':
            return {
                ...state,
                currentLevel: state.currentLevel + 1,
                selectedAnswer: null,
                mainState: 0,
                answerState: 0,
                lifeLineClickable: false,
                visibleAnswers: [0, 1, 2, 3]
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
                lifeLineFiftyFifty: action.amount
            }
        case 'setLifeLinePhoneAFriend':
            return {
                ...state,
                lifeLinePhoneAFriend: action.amount
            }
        case 'setLifeLineAskTheAudience':
            return {
                ...state,
                lifeLineAskTheAudience: action.amount
            }
        case 'setLifeLineModalIndex':
            return {
                ...state,
                lifeLineIndex: action.lifeLineIndex
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
        case 'storeQuestions':
            return {
                ...state,
                questions: [...state.questions, ...action.questions]
            }
        case 'visibleAnswers':
            return {
                ...state,
                visibleAnswers: action.visibleAnswers
            }
        default:
            return state;
    }
}

// Create the store
const GameStore = createStore(storeReducer);

export default GameStore;