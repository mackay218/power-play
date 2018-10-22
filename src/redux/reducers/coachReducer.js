import { combineReducers } from 'redux';

// Reducer for holding coach information
const coach = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_COACHES':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    coach,
  });