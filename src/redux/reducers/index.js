import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import player from './playerReducer';
import coach from './coachReducer';

const store = combineReducers({
  user,
  login,
  player,
  coach,
});

export default store;
