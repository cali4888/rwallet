/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import './style.scss';

const walletTypes = [
  { value: 'bitcoin', label: 'BitCoin' },
  { value: 'ethereum', label: 'Ethereum' }
];

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    /*
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
    */
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <article>
        <Helmet>
          <title>CryptoWalletTracker</title>
        </Helmet>
        <div className="home-page">
          <section>
            <h2>Add a Wallet</h2>
            <form onSubmit={this.props.onSubmitForm}>
              <Select
                className="walletType"
                classNamePrefix="select"
                defaultValue={walletTypes[0]}
                isClearable="True"
                isSearchable="True"
                name="color"
                options={walletTypes}
              />
              <label htmlFor="walletToken">
              Token
                <span className="at-prefix"></span>
                <input
                  id="walletToken"
                  type="text"
                  placeholder="322"
                  value={this.props.walletToken}
                />
              </label>
              <button className="addWalletButton">
                Add Wallet
              </button>
            </form>
            <ReposList {...reposListProps} />
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  walletType: PropTypes.string,
  walletToken: PropTypes.string,
};
