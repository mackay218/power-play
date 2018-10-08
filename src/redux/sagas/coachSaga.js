// Saga for getting and setting players

import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAllCoaches() {
    try {
        const allCoaches = yield call(axios.get, '/api/coaches/all');
        yield put({type: 'SET_ALL_COACHES', payload: allCoaches.data});
    } catch (error) {
        yield put({type: 'COACH_ERROR', payload: error});
    }
}

function* coachError(action) {
    yield alert('There was an error getting the coaches!');
    console.log('Coach Error:', action.payload);
}

function* coachSaga() {
    yield takeLatest('GET_ALL_COACHES', getAllCoaches);
    yield takeLatest('COACH_ERROR', coachError);
}

export default coachSaga;