import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import playerSaga from './playerSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    playerSaga(),
    // watchIncrementAsync()
  ]);
}
