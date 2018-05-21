/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_WALLET = 'rwallet/Home/CHANGE_WALLET';
export const ADD_COIN = 'rwallet/App/ADD_COIN';
export const LOAD_COINS = 'rwallet/App/LOAD_COINS';
export const LOAD_COINS_SUCCESS = 'rwallet/App/LOAD_COINS_SUCCESS';
export const LOAD_COINS_ERROR = 'rwallet/App/LOAD_COINS_ERROR';
export const LOAD_COINS_LIST = 'rwallet/App/LOAD_COINS_LIST';
export const LOAD_COINS_LIST_SUCCESS = 'rwallet/App/LOAD_COINS_SUCCESS_LIST';
export const LOAD_COINS_LIST_ERROR = 'rwallet/App/LOAD_COINS_ERROR_LIST';
export const DEFAULT_LOCALE = 'en';
