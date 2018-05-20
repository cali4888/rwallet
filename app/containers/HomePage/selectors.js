/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectWallet = () => createSelector(
  selectHome,
  (homeState) => homeState.get('walletID')
);

export {
  selectHome,
  makeSelectWallet,
};
