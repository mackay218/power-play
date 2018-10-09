// Saga for getting and setting players

import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getAllPlayers() {
    try {
        const allPlayers = yield call(axios.get, '/api/players/all');
        yield put({type: 'SET_ALL_PLAYERS', payload: allPlayers.data});
    } catch (error) {
        yield put({type: 'PLAYER_ERROR', payload: error});
    }
}

function* createPlayer(action) {
    try {
        yield call(axios.post, '/api/players/create', { id: action.payload});
    } catch (error) {
        yield put({type: 'PLAYER_ERROR', payload: error});
    }
}

function* playerError(action) {
    yield alert('There was an error getting the players!');
    console.log('Player Error:', action.payload);
}

function* playerProfileById() {
    try {
        const playerProfile = yield call(axios.get, '/api/players/profileById');
        yield put({type: 'SET_PLAYERS_BY_ID', payload: playerProfile.data});
    } catch (error) {
        yield put({type: 'PLAYER_ERROR', payload: error});
    }
}

function* playerSaga() {
    yield takeLatest('GET_ALL_PLAYERS', getAllPlayers);
    yield takeLatest('PLAYER_ERROR', playerError);
    yield takeLatest('GET_THIS_PLAYER', playerProfileById);
    yield takeLatest('CREATE_PLAYER', createPlayer);
}

export default playerSaga;