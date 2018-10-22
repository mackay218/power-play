import { combineReducers } from 'redux';
import { USER_ACTIONS } from '../actions/userActions';
// Reducer to hold the users id
const id = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.personid || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};
// Reducer to hold the users email
const email = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.email || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};
// Reducer to hold the users role
const role = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.role || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};
// Reducer to hold the users status type
const statusType = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.status_type || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
}
// Reducer to check if the user is loading
const isLoading = (state = false, action) => {
  switch (action.type) {
    case USER_ACTIONS.REQUEST_START:
      return true;
    case USER_ACTIONS.REQUEST_DONE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  id,
  role,
  email,
  isLoading,
  statusType,
});
