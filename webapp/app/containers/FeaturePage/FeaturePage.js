/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { WALLET_UPDATE_INTERVAL } from '../../containers/App/constants';

import './style.scss';

export default class FeaturePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="feature-page">
        <Helmet>
          <title>FAQ</title>
        </Helmet>
        <ol>
          <li>
            <p className="title">Get a Wallet</p>
            <p>
              {
                "Enter your email and press Enter. If a wallet with this email doesn't exist yet, it will be created automatically."
              }
            </p>
          </li>
          <li>
            <p className="title">Add or Remove coins</p>
            <p>
              {
                "Choose a coin type, enter coin's address and press + to add coin to a wallet. Press a trash button to remove one."
              }
            </p>
          </li>
          <li>
            <p className="title">Updated Automatically</p>
            <p>
              {
                `Once you logged in, your wallet will be automatically updated every ${WALLET_UPDATE_INTERVAL / 1000} seconds. No need to refresh the page.`
              }
            </p>
          </li>
        </ol>
      </div>
    );
  }
}
