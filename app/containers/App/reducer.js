/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_COINS_SUCCESS,
  LOAD_COINS,
  LOAD_COINS_ERROR,
  LOAD_COINS_LIST,
  LOAD_COINS_LIST_SUCCESS,
  LOAD_COINS_LIST_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  walletID: false,
  walletData: {
    coins: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COINS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['walletData', 'coins'], false);
    case LOAD_COINS_SUCCESS:
      return state
        .setIn(['walletData', 'coins'], action.coins)
        .set('loading', false)
        .set('walletID', action.walletID);
    case LOAD_COINS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case LOAD_COINS_LIST:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['walletData', 'coins'], false);
    case LOAD_COINS_LIST_SUCCESS:
      return state
        .setIn(['walletData', 'coins'], action.coins)
        .set('loading', false)
        .set('walletID', action.walletID);
    case LOAD_COINS_LIST_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
