import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectWallet } from 'containers/App/selectors';
import CoinListItem from './CoinListItem';

export default connect(
  createStructuredSelector({
    // currentUser: makeSelectCurrentUser()
    walletID: makeSelectWallet()
  })
)(CoinListItem);
