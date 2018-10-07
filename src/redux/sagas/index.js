import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import playerSaga from './playerSaga';
import coachSaga from './coachSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    playerSaga(),
    coachSaga(),
    // watchIncrementAsync()
  ]);
}
