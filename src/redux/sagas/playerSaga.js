// Saga for getting and setting players

import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';
// Saga for getting all players
function* getAllPlayers() {
    try {
        const allPlayers = yield call(axios.get, '/api/players/all');
        yield put({type: 'SET_ALL_PLAYERS', payload: allPlayers.data});
    } catch (error) {
        yield put({type: 'PLAYER_ERROR', payload: error});
    }
}
// Saga for creating a player
function* createPlayer(action) {
    try {
        yield call(axios.post, '/api/players/create', { id: action.payload});
    } catch (error) {
        yield put({type: 'PLAYER_ERROR', payload: error});
    }
}
// Saga for removing a player from the database
function* deletePlayer(action) {
    try {
        yield call(axios.delete, `/api/players/delete/${action.payload}`);
        yield put({type: 'GET_ALL_PLAYERS'});
    } catch (error) {
        yield put({type: 'PLAYER_ERROR', payload: error});
    }
}
// Saga for sorting players by stats
function* sortPlayerBy(action) {
    try {
        console.log(action.payload);
        const sortedPlayers = yield call(axios.get, `/api/players/sorted?position=${action.payload.position_id}&minPoints=${action.payload.pointsMin}&minWins=${action.payload.winsMin}&minDate=${action.payload.birthDayMin}&maxDate=${action.payload.birthDayMax}&page=${action.payload.page}`);
        yield put({type: 'SET_ALL_PLAYERS', payload: sortedPlayers.data});        
    } catch (error) {
        yield put({type: 'PLAYER_ERROR', payload: error});
    }
}
// Saga for getting players to populate the CSV file
function* getCSVList() {
    try {
        const csvList = yield call(axios.get, '/api/players/csvList');
        yield put({type: 'SET_CSV_LIST', payload: csvList.data});
    } catch (error) {
        yield put({type: 'PLAYER_ERROR', payload: error});
    }
}
// Saga for searching by name
function* searchByName(action) {
    try {
        console.log(action.payload);
        const playerByName = yield call(axios.get, `/api/players/byName?name=${action.payload.playerName}&page=${action.payload.page}`);
        yield put({type: 'SET_ALL_PLAYERS', payload: playerByName.data});
    } catch (error) {
        yield put({type: 'PLAYER_ERROR', payload: error});
    }
}
// Saga for getting a specific players information
function* getPlayerInfo(action) {
    try {
        const playerInfo = yield call(axios.get, `/api/players/playerInfo/${action.payload}`);
        console.log('in getPlayerInfoSaga', playerInfo.data);
        
        yield put({type: 'SET_PLAYER_INFO', payload: playerInfo.data});
    } catch (error) {
        yield put({type: 'PLAYER_ERROR', payload: error});
    }
}
// Saga to suspend a player
function* suspendPlayer(action) {
    try {
        yield call(axios.put, `/api/players/suspend/`, action.payload);
    } catch (error) {
        yield put({type: 'PLAYER_ERROR', payload: error});
    }
}
// Saga to be triggered when a player error is thrown
function* playerError(action) {
    yield swal('There was an error getting the players!');
    console.log('Player Error:', action.payload);
}

function* playerSaga() {
    yield takeLatest('GET_ALL_PLAYERS', getAllPlayers);
    yield takeLatest('PLAYER_ERROR', playerError);
    yield takeLatest('CREATE_PLAYER', createPlayer);
    yield takeLatest('DELETE_PLAYER', deletePlayer);
    yield takeLatest('SORT_PLAYER_BY', sortPlayerBy);
    yield takeLatest('GET_PLAYER_INFO', getPlayerInfo);
    yield takeLatest('GET_CSV_LIST', getCSVList);
    yield takeLatest('SEARCH_BY_NAME', searchByName);
    yield takeLatest('SUSPEND_PLAYER', suspendPlayer);
}

export default playerSaga;