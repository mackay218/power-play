import { combineReducers } from 'redux';

const registered = (state = false, action) => {
    switch (action.type) {
        case 'REGISTRATION_COMPLETE':
            return true;
        case 'RESET_REGISTERED':
            return false;
        default: 
            return state;
    }
}

export default combineReducers({
    registered,
  });