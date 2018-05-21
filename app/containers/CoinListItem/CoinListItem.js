/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'components/ListItem';
import { IssueIcon } from 'components/Icons';
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
      <div className="repo-list-item">
        <a className="repo-list-item__repo-link">
          {item.type}, {item.address}, {item.balance}
        </a>
        <a className="repo-list-item__issue-link">
          <IssueIcon className="repo-list-item__issue-icon" />
          {item.coin_price}
        </a>
      </div>
    );

    // Render the content into a list item
    return (
      <ListItem key={`repo-list-item-${item.full_name}`} item={content} />
    );
  }
}

CoinListItem.propTypes = {
  item: PropTypes.object,
};
