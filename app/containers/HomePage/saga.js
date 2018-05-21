/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { LOAD_COINS, LOAD_COINS_LIST } from 'containers/App/constants';
import { coinsLoaded, coinLoadingError, coinsListLoaded, coinListLoadingError } from 'containers/App/actions';
import { makeSelectWallet } from 'containers/App/selectors';

/**
 * API request/response handler
 */

export function* getAvailableCoins() {
  const requestURL = 'http://localhost:8091/v1/supportedcoins';

  try {
    const availableCoinsList = yield call(request, requestURL);
    yield put(coinsListLoaded(availableCoinsList.data));
  } catch (err) {
    yield put(coinListLoadingError(err));
  }
}

export function* getCoins() {
  // Select username from store
  const walletID = yield select(makeSelectWallet());
  const requestURL = 'https://api.github.com/users/repos?type=all&sort=updated';

  try {
    // Call our request helper (see 'utils/request')
    const coins = yield call(request, requestURL);
    yield put(coinsLoaded(coins, walletID));
  } catch (err) {
    yield put(coinLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* availableCoins() {
  // Watches for LOAD_COINS actions and calls getCoins when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_COINS_LIST, getAvailableCoins);
}

export function* coinsData() {
  // Watches for LOAD_COINS actions and calls getCoins when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_COINS, getCoins);
}
