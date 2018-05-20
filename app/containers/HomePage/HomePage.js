/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import CoinsList from 'components/CoinsList';
import './style.scss';

const coinTypes = [
  { value: 'bitcoin', label: 'BitCoin' },
  { value: 'ethereum', label: 'Ethereum' }
];

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.walletID && this.props.walletID.trim().length > 0) {
      this.props.changeWallet();
    }
  }

  render() {
    const { loading, error, repos } = this.props;
    const coinsListProps = {
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
            <form onSubmit={this.props.changeWallet}>
              <label htmlFor="walletID">
              Wallet ID
                <span className="at-prefix"></span>
                <input
                  id="walletID"
                  type="text"
                  placeholder="pisarukvadim@gmail.com"
                  value={this.props.walletID}
                />
              </label>
            </form>
            <h2>Add a Coin</h2>
            <form onSubmit={this.props.addCoin}>
              <Select
                className="coinType"
                classNamePrefix="select"
                defaultValue={coinTypes[0]}
                isClearable="True"
                isSearchable="True"
                name="color"
                options={coinTypes}
              />
              <label htmlFor="coinToken">
              Token
                <span className="at-prefix"></span>
                <input
                  id="coinToken"
                  type="text"
                  placeholder="322"
                  value={this.props.coinToken}
                />
              </label>
              <button className="addCoinButton">
                Add Wallet
              </button>
            </form>
            <CoinsList {...coinsListProps} />
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
  walletID: PropTypes.string,
  changeWallet: PropTypes.func,
  addCoin: PropTypes.func,
  coinType: PropTypes.string,
  coinToken: PropTypes.string,
};
