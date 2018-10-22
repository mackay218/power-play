import { combineReducers } from 'redux';
import moment from 'moment';

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

            if(typeof(action.payload.school_year) === 'number'){
                action.payload.school_year = action.payload.school_year.toString();
            }
            if(typeof(action.payload.position_id === 'number')){
                action.payload.position_id = action.payload.position_id.toString();
            }
            if(typeof(action.payload.birth_date) === 'string'){
                action.payload.birth_date = moment(action.payload.birth_date).format('YYYY-MM-DD');
            }
            if(typeof(action.payload.league_id) === 'number'){
                action.payload.league_id = action.payload.league_id.toString();
            }

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