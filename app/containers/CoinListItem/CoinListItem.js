/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'components/ListItem';
import './style.scss';

export default class CoinListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { item } = this.props;

    // If the repository is owned by a different person than we got the data for
    // it's a fork and we should show the name of the owner
    /*
    let nameprefix = '';
    if (item.owner.login !== this.props.currentUser) {
      nameprefix = `${item.owner.login}/`;
    }
    */

    // Put together the content of the repository
    const content = (
      <div className="coin-list-item">
        <div className="coin-list-item__type">
          {item.type}
        </div>
        <div className="coin-list-item__token">
          {item.address}
        </div>
        <div className="coin-list-item__balance">
          <i className="fas fa-coins"></i>
          {Number.parseFloat(item.balance).toFixed(6)}
        </div>
        <div className="coin-list-item__price">
          <i className="fas fa-dollar-sign"></i>
          {Number.parseFloat(item.coin_price).toFixed(2)}
        </div>
        <div className="coin-list-item__net">
          <i className="fas fa-tag"></i>
          {Number.parseFloat(item.balance * item.coin_price).toFixed(2)}$
        </div>
        <div className="coin-list-item__remove">
          <button>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    );

    // Render the content into a list item
    return (
      <ListItem key={`coin-list-item-${item.full_name}`} item={content} />
    );
  }
}

CoinListItem.propTypes = {
  item: PropTypes.object,
};
