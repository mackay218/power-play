import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* checkout(action) {
    try {
        yield call(axios.post, '/api/charge', { stripeToken: action.payload.token });
        const registeredUser = yield call(axios.post, '/api/user/register/', action.payload.registerInfo);
        yield call(axios.post, '/api/players/create', { id: registeredUser.data.id });
        yield put({type: 'REGISTRATION_COMPLETE'});
    } catch (error) {
        yield put({ type: 'REGISTER_ERROR', payload: error });
    }
}

function* registerError(action) {
    yield alert('There was an error registering new user!');
    console.log('register Error:', action.payload);
}

function* registerSaga() {
    yield takeLatest('CHECKOUT', checkout);
    yield takeLatest('REGISTER_ERROR', registerError);
}

export default registerSaga;