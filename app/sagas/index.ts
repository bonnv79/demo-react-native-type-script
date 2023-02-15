import { fork, spawn } from 'redux-saga/effects'
import newsSaga from "./newsSagas";


function* rootSaga() {
  // yield fork(newsSaga);
  yield spawn(newsSaga);
}

export default rootSaga;