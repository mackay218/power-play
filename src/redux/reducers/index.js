import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import player from './playerReducer';
import coach from './coachReducer';
import registered from './registerReducer';

const store = combineReducers({
  user,
  login,
  player,
  coach,
  registered,
});

export default store;
