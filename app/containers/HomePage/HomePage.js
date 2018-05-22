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
import Input from 'components/Input';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.loadCoinsList();
  }

  render() {
    const {
      loggedIn, loading, error, coins
    } = this.props;

    const walletIDInputProps = {
      type: 'email',
      value: this.props.walletID,
      onChange: this.props.onChangeWallet
    };

    const signInButtonIcon = loggedIn ? 'fa fas fa-check' : 'fa fas fa-sign-in-alt';
    const signInButtonProps = {
      class: 'iconButton',
      disabled: loggedIn
    };

    const availableCoins = this.props.availableCoins.map((coin) => ({ value: coin, label: coin }));
    const coinSelectListProps = {
      className: 'coinTypeSelect',
      classNamePrefix: 'select',
      isSearchable: 'True',
      name: 'coinType',
      options: availableCoins,
      isDisabled: !loggedIn
    };

    const coinAddressInputProps = {
      class: 'small wide',
      type: 'text',
      value: this.props.coinToken,
      disabled: !loggedIn
    };

    const addCoinButtonProps = {
      class: 'iconButton large',
      disabled: !loggedIn
    };

    const coinsListProps = {
      loading,
      error,
      coins: loggedIn ? coins : [],
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
                <Input {...walletIDInputProps} />
              </label>
              <Button {...signInButtonProps} >
                <i className={signInButtonIcon} />
              </Button>
            </form>

            <form onSubmit={this.props.onAddCoin} className="addCoinForm">
              <div className="item">
                <Select {...coinSelectListProps} />
              </div>
              <div className="item">
                <label htmlFor="coinAddress">
                  <i className="fas fa-key"></i>
                  <Input {...coinAddressInputProps} />
                </label>
              </div>
              <div className="item">
                <Button {...addCoinButtonProps}>
                  <i className="fas fa-plus"></i>
                </Button>
              </div>
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
