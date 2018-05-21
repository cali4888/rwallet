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
import Button from 'components/Button';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.loadCoinsList();
  }

  render() {
    const {
      loggedIn, loading, error, coins
    } = this.props;

    const availableCoins = this.props.availableCoins.map((coin) => ({ value: coin, label: coin }));

    const signInButtonProps = {
      fa: loggedIn ? 'fa fas fa-check' : 'fa fas fa-sign-in-alt',
      class: 'signIn'
    };

    const coinSelectListProps = {
      className: 'coinType',
      classNamePrefix: 'select',
      defaultValue: availableCoins[0],
      isSearchable: 'True',
      name: 'coinType',
      options: availableCoins,
    };

    const coinsListProps = {
      loading,
      error,
      coins,
    };

    return (
      <article>
        <Helmet>
          <title>CryptoWalletTracker</title>
        </Helmet>
        <div className="home-page">
          <section>
            <form onSubmit={this.props.onSignIn}>
              <label htmlFor="walletID">
                <i className="far fa-envelope"></i>
                <input
                  id="walletID"
                  type="email"
                  value={this.props.walletID}
                  onChange={this.props.onChangeWallet}
                />
                <Button {...signInButtonProps} />
              </label>
            </form>

            <form onSubmit={this.props.onAddCoin}>
              <Select {...coinSelectListProps} />
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
                Add Coin
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
  coins: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  loggedIn: PropTypes.bool,
  loadCoinsList: PropTypes.func,
  availableCoins: PropTypes.array,
  walletID: PropTypes.string,
  onChangeWallet: PropTypes.func,
  onSignIn: PropTypes.func,
  onAddCoin: PropTypes.func,
  coinType: PropTypes.string,
  coinToken: PropTypes.string,
};
