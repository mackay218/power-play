import { combineReducers } from 'redux';

const player = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_PLAYERS':
            return action.payload;
        case 'SET_PLAYERS_BY_ID':
            return action.payload;
        default:
            return state;
    }
}

const playerInfo = (state = [], action) => {
    switch (action.type) {
        case 'SET_PLAYER_INFO':
            return action.payload;
        default: 
            return state;
    }
}

const csvList = (state = [], action) => {
    switch (action.type) {
        case 'SET_CSV_LIST':
            return action.payload;
        default: 
            return state;
    }
}

export default combineReducers({
    player,
    csvList,
    playerInfo,
  });