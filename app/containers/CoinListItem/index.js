import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import CoinListItem from './CoinListItem';

export default connect(
  createStructuredSelector({
    currentUser: makeSelectCurrentUser()
  })
)(CoinListItem);
