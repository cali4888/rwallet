/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_WALLET,
  ADD_COIN,
  ADDED_COIN,
  ADD_COIN_ERROR,
  REMOVE_COIN,
  REMOVED_COIN,
  REMOVE_COIN_ERROR,
  LOAD_COINS,
  LOAD_COINS_SUCCESS,
  LOAD_COINS_ERROR,
  LOAD_COINS_LIST,
  LOAD_COINS_LIST_SUCCESS,
  LOAD_COINS_LIST_ERROR,
} from './constants';

/**
 * Changes the input field of the form
 */
export function changeWallet(walletID) {
  return {
    type: CHANGE_WALLET,
    walletID
  };
}


/**
 * Load the repositories, this action starts the request saga
 */
export function addCoin(coinType, coinAddress) {
  return {
    type: ADD_COIN,
    coinType,
    coinAddress
  };
}

export function addedCoin() {
  return {
    type: ADDED_COIN
  };
}

export function addCoinError(error) {
  return {
    type: ADD_COIN_ERROR,
    error
  };
}

export function removeCoin(coinType, coinAddress) {
  return {
    type: REMOVE_COIN,
    coinType,
    coinAddress
  };
}

export function removedCoin() {
  return {
    type: REMOVED_COIN
  };
}

export function removeCoinError(error) {
  return {
    type: REMOVE_COIN_ERROR,
    error
  };
}

/**
 * Load the repositories, this action starts the request saga
 */
export function loadCoins() {
  return {
    type: LOAD_COINS,
  };
}

export function loadCoinsList() {
  return {
    type: LOAD_COINS_LIST,
  };
}

/**
 * Dispatched when the coins are loaded by the request saga
 */
export function coinsLoaded(coins) {
  return {
    type: LOAD_COINS_SUCCESS,
    coins,
  };
}

export function coinsListLoaded(availableCoins) {
  return {
    type: LOAD_COINS_LIST_SUCCESS,
    availableCoins,
  };
}

/**
 * Dispatched when loading the repositories fails
 */
export function coinLoadingError(error) {
  return {
    type: LOAD_COINS_ERROR,
    error,
  };
}

export function coinListLoadingError(error) {
  return {
    type: LOAD_COINS_LIST_ERROR,
    error,
  };
}
