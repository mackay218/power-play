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

function* deletePlayer(action) {
    try {
        yield call(axios.delete, `/api/players/delete/${action.payload}`);
    } catch (error) {
        yield put({type: 'PLAYER_ERROR', payload: error});
    }
}

function* sortBy(action) {
    try {
        const sortedPlayers = yield call(axios.get, `/api/player/sorted?position=${action.payload.position_id}
                                                                       &minPoints=${action.payload.pointsMin}
                                                                       &maxPoints=${action.payload.pointsMax}
                                                                       &minWins=${action.payload.winsMin}
                                                                       &maxWins${action.payload.winsMax}
                                                                       &minDate=${action.payload.birthDayMin}
                                                                       &maxDate=${action.payload.birthDayMax}
                                                                       &page=${action.payload.page}`);
        yield put({type: 'SET_ALL_PLAYERS', paylaod: sortedPlayers});        
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
    yield takeLatest('DELETE_PLAYER', deletePlayer);
    yield takeLatest('SORT_BY', sortBy);
}

export default playerSaga;