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

function* deleteCoach(action) {
    try {
        yield call(axios.delete, `api/coaches/delete/${action.payload}`);
        yield put({type: 'GET_ALL_COACHES'});
    } catch (error) {
        yield put({type: 'COACH_ERROR', payload: error});
    }
}

function* suspendCoach(action) {
    try {
        yield call(axios.put, `api/coaches/suspend/${action.payload}`);
        yield put({type: 'GET_ALL_COACHES'});
    } catch (error) {
        yield put({type: 'COACH_ERROR', payload: error});
    }
}

function* banCoach(action) {
    try {
        yield call(axios.put, `api/coaches/ban/${action.payload}`);
        yield put({type: 'GET_ALL_COACHES'});
    } catch (error) {
        yield put({type: 'COACH_ERROR', payload: error});
    }
}

function* coachSaga() {
    yield takeLatest('GET_ALL_COACHES', getAllCoaches);
    yield takeLatest('COACH_ERROR', coachError);
    yield takeLatest('DELETE_COACH', deleteCoach);
    yield takeLatest('SUSPEND_COACH', suspendCoach);
    yield takeLatest('BAN_COACH', banCoach);
}

export default coachSaga;