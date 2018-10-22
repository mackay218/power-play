// Saga for getting and setting players

import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';

// Saga for getting all the coaches from the database
function* getAllCoaches() {
    try {
        const allCoaches = yield call(axios.get, '/api/coaches/all');
        yield put({type: 'SET_ALL_COACHES', payload: allCoaches.data});
    } catch (error) {
        yield put({type: 'COACH_ERROR', payload: error});
    }
}
// Saga that is triggered when an error is thrown
function* coachError(action) {
    yield swal('There was an error getting the coaches!');
    console.log('Coach Error:', action.payload);
}
// Saga to remove a coach from the database
function* deleteCoach(action) {
    try {
        yield call(axios.delete, `api/coaches/delete/${action.payload}`);
        yield put({type: 'GET_ALL_COACHES'});
    } catch (error) {
        yield put({type: 'COACH_ERROR', payload: error});
    }
}
// Saga to suspend a coach
function* suspendCoach(action) {
    try {
        yield call(axios.put, `api/coaches/suspend/${action.payload}`);
        yield put({type: 'GET_ALL_COACHES'});
    } catch (error) {
        yield put({type: 'COACH_ERROR', payload: error});
    }
}
// Saga to change coach table pages 
function* pageCoaches(action) {
    try {
        console.log(action);
        const coachPage = yield call(axios.get, `/api/coaches/paged?page=${action.payload.page}`);
        yield put({type: 'SET_ALL_COACHES', payload: coachPage.data});        
    } catch (error) {
        yield put({type: 'COACH_ERROR', payload: error});
    }
}
// Saga to ban a coach
function* banCoach(action) {
    try {
        yield call(axios.put, `api/coaches/ban/${action.payload}`);
        yield put({type: 'GET_ALL_COACHES'});
    } catch (error) {
        yield put({type: 'COACH_ERROR', payload: error});
    }
}

function* searchCoaches(action) {
    try {
        const coachByName = yield call(axios.get, `api/coaches/search?name=${action.payload}`);
        yield console.log(coachByName);
        yield put({type: 'SET_ALL_COACHES', payload: coachByName.data});
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
    yield takeLatest('PAGE_COACHES', pageCoaches);
    yield takeLatest('SEARCH_COACHES', searchCoaches);
}

export default coachSaga;