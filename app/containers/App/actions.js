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
  LOAD_COINS,
  LOAD_COINS_SUCCESS,
  LOAD_COINS_ERROR,
  LOAD_COINS_LIST,
  LOAD_COINS_LIST_SUCCESS,
  LOAD_COINS_LIST_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
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
 *
 * @param  {array} coins The coins data
 * @param  {string} walletID The current wallet
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function coinsLoaded(coins, walletID) {
  return {
    type: LOAD_COINS_SUCCESS,
    coins,
    walletID,
  };
}

export function coinsListLoaded(coins, walletID) {
  return {
    type: LOAD_COINS_LIST_SUCCESS,
    coins,
    walletID,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
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
