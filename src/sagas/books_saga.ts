import { put, takeLatest, call } from "redux-saga/effects";

import {
  getBooks,
  registerBooks,
  getMyBooks,
  getMyBook,
} from "../actions/books_action";
import {
  getGoogleBooksApi,
  registerBookToRailsApi,
  getMyBooksToRailsApi,
  getMyBookFromRailsApi,
} from "../apis/books_apis";

function* runGetBook(action: ReturnType<typeof getBooks.get>) {
  try {
    let books_data = yield call(getGoogleBooksApi, action.keyword);
    yield put(getBooks.success(books_data));
  } catch (e) {
    console.log(e.message);
    yield put(getBooks.error(e.message));
  }
}

function* runRegisterBook(action: ReturnType<typeof registerBooks.register>) {
  try {
    yield call(registerBookToRailsApi, action.data);
    yield put(registerBooks.success("MyBooksを登録しました"));
  } catch (e) {
    yield put(registerBooks.error(e.message));
  }
}

function* runGetMyBooks() {
  try {
    let data = yield call(getMyBooksToRailsApi);
    yield put(getMyBooks.success(data));
  } catch (e) {
    yield put(getMyBooks.error(e.message));
  }
}

function* runGetMyBook(action: ReturnType<typeof getMyBook.get>) {
  try {
    let response = yield getMyBookFromRailsApi(action.id);
    yield put(getMyBook.success(response));
  } catch (e) {}
}

export function* watchGetBooks() {
  yield takeLatest("GET_BOOKS", runGetBook);
}

export function* watchRegisterBook() {
  yield takeLatest("REGISTER_BOOKS", runRegisterBook);
}

export function* watchGetMyBooks() {
  yield takeLatest("GET_MYBOOKS", runGetMyBooks);
}

export function* watchGetMyBook() {
  yield takeLatest("GET_MYBOOK", runGetMyBook);
}
