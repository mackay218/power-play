import { combineReducers } from 'redux';

const player = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_PLAYERS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    player,
  });