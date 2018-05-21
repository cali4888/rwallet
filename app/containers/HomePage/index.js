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
  makeSelectError
} from 'containers/App/selectors';
import { changeWallet, addCoin, loadCoins, loadCoinsList } from '../App/actions';
import reducer from '../App/reducer';
import { availableCoins } from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  onChangeWallet: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    const newWalletID = evt.target.querySelector('#walletID').value;
    dispatch(changeWallet(newWalletID));
    dispatch(loadCoins());
  },
  onAddCoin: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
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
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga: availableCoins });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
