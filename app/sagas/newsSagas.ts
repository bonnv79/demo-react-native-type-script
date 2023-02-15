import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { createItem, deleteItem, getItems, getItemsById } from '../../services/api';
import { isLoading } from '../actions/appActions';
import { getNews, setNewsById } from '../actions/newsActions';
import { GET_NEWS, GET_NEWS_BY_ID, REQUEST_CREATE_NEWS, REQUEST_DELETE_NEWS, SET_NEWS } from '../const/newsConst';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchNews(action: any): any {
  try {
    yield put(isLoading(true));

    const res = yield call(getItems);
    yield put({ type: SET_NEWS, data: res?.data });

    yield put(isLoading(false));
  } catch (e) {
    // yield put({ type: "NEWS_FETCH_FAILED", message: e.message });
  }
}

function* gethNewsByIdSagas(action: any): any {
  try {
    yield put(isLoading(true));

    yield put(setNewsById({}));
    const res = yield call(getItemsById, action.data?.id);
    yield put(setNewsById(res?.data));

    if (action?.data?.switchEditPage) {
      action?.data?.switchEditPage();
    }

    yield put(isLoading(false));
  } catch (e) {
    // yield put({ type: "NEWS_FETCH_FAILED", message: e.message });
  }
}

function* requestCreateNewsSagas(action: any): any {
  try {
    yield put(isLoading(true));

    yield call(createItem, action.data);
    yield put(getNews());

    yield put(isLoading(false));


    // if (hasError(res)) {
    //   showNotify(res?.message, ALERT_COLOR.danger);
    //   return;
    // }
    // navigation.replace('Root');
    // showNotify('Create successfully');
  } catch (e) {
    // yield put({ type: "NEWS_FETCH_FAILED", message: e.message });
  }
}

function* requestDeleteNewsSagas(action: any): any {
  try {
    yield put(isLoading(true));

    yield call(deleteItem, action.data?.id);
    yield put(getNews());

    yield put(isLoading(false));

  } catch (e) {
    // yield put({ type: "NEWS_FETCH_FAILED", message: e.message });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
// function* mySaga() {
//   yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }

/*
  Alternatively you may use takeLatest.
  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* newsSaga() {
  yield takeLatest(GET_NEWS, fetchNews);
  yield takeLatest(GET_NEWS_BY_ID, gethNewsByIdSagas);
  yield takeLatest(REQUEST_CREATE_NEWS, requestCreateNewsSagas);
  yield takeLatest(REQUEST_DELETE_NEWS, requestDeleteNewsSagas);
}

export default newsSaga;