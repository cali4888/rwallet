/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectWallet = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['wallet', 'walletID'])
);

const makeSelectCoins = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['wallet', 'coins'])
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectWallet,
  makeSelectCoins,
  makeSelectLocation,
};
