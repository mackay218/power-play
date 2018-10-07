import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import player from './playerReducer';

const store = combineReducers({
  user,
  login,
  player,
});

export default store;
