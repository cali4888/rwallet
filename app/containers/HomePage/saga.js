/**
 * Gets the repositories of the user from Github
 */

import { all, call, put, select, takeLatest } from 'redux-saga/effects';
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
  const walletID = yield select(makeSelectWallet());
  const requestURL = 'http://localhost:8091/v1/wallet/';
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: walletID,
    }
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(coinsLoaded(response.data.coins));
  } catch (err) {
    yield put(coinLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */

export default function* coinsData() {
  // Watches for actions and calls respective functions when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount

  yield all([
    takeLatest(LOAD_COINS, getCoins),
    takeLatest(LOAD_COINS_LIST, getAvailableCoins)
  ]);
}
