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

const makeSelectLoggedIn = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loggedIn')
);

const makeSelectWallet = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('walletID')
);

const makeSelectCoins = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['wallet', 'coins'])
);

const makeSelectAvailableCoins = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('availableCoins').toJS()
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectLoggedIn,
  makeSelectWallet,
  makeSelectCoins,
  makeSelectAvailableCoins,
  makeSelectLocation,
};
