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
  CHANGE_WALLET,
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
  loggedIn: false,
  availableCoins: [],
  walletID: 'pisarukvadim@gmail.com',
  wallet: {
    coins: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_WALLET:
      return state
        .set('walletID', action.walletID)
        .set('loggedIn', false);
    case LOAD_COINS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['wallet', 'coins'], false);
    case LOAD_COINS_SUCCESS:
      return state
        .set('loggedIn', true)
        .setIn(['wallet', 'coins'], action.coins)
        .set('loading', false);
    case LOAD_COINS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
        .set('loggedIn', false);
    case LOAD_COINS_LIST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('availableCoins', fromJS([]));
    case LOAD_COINS_LIST_SUCCESS:
      return state
        .set('availableCoins', fromJS(action.availableCoins))
        .set('loading', false);
    case LOAD_COINS_LIST_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
