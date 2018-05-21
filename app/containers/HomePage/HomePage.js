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

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.loadCoinsList();
  }

  render() {
    const { loading, error, coins } = this.props;
    const coinsListProps = {
      loading,
      error,
      coins,
    };

    const availableCoins = this.props.availableCoins.map((coin) => ({ value: coin, label: coin }));

    return (
      <article>
        <Helmet>
          <title>CryptoWalletTracker</title>
        </Helmet>
        <div className="home-page">
          <section>
            <form onSubmit={this.props.onSubmitWallet}>
              <label htmlFor="walletID">
                <i className="far fa-envelope"></i>
                <input
                  id="walletID"
                  type="email"
                  value={this.props.walletID}
                  onChange={this.props.onChangeWallet}
                />
                <button className="submitWallet">
                  <i className="fas fa-check"></i>
                </button>
              </label>
            </form>

            <form onSubmit={this.props.onAddCoin}>
              <Select
                className="coinType"
                classNamePrefix="select"
                defaultValue={availableCoins[0]}
                isClearable="True"
                isSearchable="True"
                name="coinType"
                options={availableCoins}
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
  loadCoinsList: PropTypes.func,
  availableCoins: PropTypes.array,
  walletID: PropTypes.string,
  onChangeWallet: PropTypes.func,
  onSubmitWallet: PropTypes.func,
  onAddCoin: PropTypes.func,
  coinType: PropTypes.string,
  coinToken: PropTypes.string,
};
