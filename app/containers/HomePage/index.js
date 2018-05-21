import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectWallet,
  makeSelectLoading,
  makeSelectError
} from 'containers/App/selectors';
import { loadCoins } from '../App/actions';
import { changeWallet } from './actions';
// import { makeSelectWallet } from './selectors';
import reducer from './reducer';
import { availableCoins } from './saga';
import HomePage from './HomePage';

const mapDispatchToProps = (dispatch) => ({
  onChangeWallet: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(changeWallet(evt.target.value));
  },
  onAddCoin: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(loadCoins());
  }
});

const mapStateToProps = createStructuredSelector({
  walletID: makeSelectWallet(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga: availableCoins });

export default compose(withReducer, withSaga, withConnect)(HomePage);
export { mapDispatchToProps };
