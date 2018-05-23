/**
 * Gets the repositories of the user from Github
 */

import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { requestAvailableCoins, requestCoins, requestAddCoin, requestRemoveCoin } from 'containers/App/requestAPI';
import { LOAD_COINS, LOAD_COINS_LIST, ADD_COIN, REMOVE_COIN } from 'containers/App/constants';
import { coinsLoaded, coinLoadingError, coinsListLoaded, coinListLoadingError, addedCoin, addCoinError, removedCoin, removeCoinError } from 'containers/App/actions';
import { makeSelectWallet } from 'containers/App/selectors';


/**
 * Saga workers
 */

export function* getAvailableCoins() {
  try {
    const availableCoinsList = yield call(requestAvailableCoins);
    yield put(coinsListLoaded(availableCoinsList.data));
  } catch (err) {
    yield put(coinListLoadingError(err));
  }
}

export function* getCoins() {
  const walletID = yield select(makeSelectWallet());

  try {
    const response = yield call(requestCoins, walletID);
    yield put(coinsLoaded(response.data.coins));
  } catch (err) {
    yield put(coinLoadingError(err));
  }
}

export function* addCoin(action) {
  const walletID = yield select(makeSelectWallet());

  try {
    yield call(requestAddCoin, walletID, action.coinType, action.coinAddress);
    const response = yield call(getCoins, walletID);
    yield put(addedCoin(response.data.coins));
  } catch (err) {
    yield put(addCoinError(err));
  }
}

export function* removeCoin(action) {
  const walletID = yield select(makeSelectWallet());

  try {
    yield call(requestRemoveCoin, walletID, action.coinType, action.coinAddress);
    const response = yield call(getCoins, walletID);
    yield put(removedCoin(response.data.coins));
  } catch (err) {
    yield put(removeCoinError(err));
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
    takeLatest(LOAD_COINS_LIST, getAvailableCoins),
    takeLatest(ADD_COIN, addCoin),
    takeLatest(REMOVE_COIN, removeCoin),
  ]);
}
