import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectWallet,
  makeSelectCoins,
  makeSelectAvailableCoins,
  makeSelectLoading,
  makeSelectError,
  makeSelectLoggedIn
} from 'containers/App/selectors';
import {
  changeWallet,
  addCoin,
  loadCoins,
  loadCoinsList
} from '../App/actions';
import reducer from '../App/reducer';
import saga from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  onChangeWallet: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    const newWalletID = evt.target.value;
    dispatch(changeWallet(newWalletID));
  },
  onSignIn: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadCoins());
  },
  onAddCoin: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    console.log('add coin');
    dispatch(addCoin());
  },
  loadCoinsList: () => {
    dispatch(loadCoinsList());
  }
});

const mapStateToProps = createStructuredSelector({
  walletID: makeSelectWallet(),
  coins: makeSelectCoins(),
  availableCoins: makeSelectAvailableCoins(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  loggedIn: makeSelectLoggedIn()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
