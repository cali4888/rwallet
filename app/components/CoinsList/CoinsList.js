import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import CoinListItem from 'containers/CoinListItem';

const CoinsList = ({ loading, error, coins }) => {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (coins !== false && coins !== undefined) {
    return <List items={coins} component={CoinListItem} />;
  }

  return null;
};

CoinsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  coins: PropTypes.any
};

export default CoinsList;
