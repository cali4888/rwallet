import React from 'react';
import { Link } from 'react-router-dom';

import Banner from './images/banner.jpg';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <img src={Banner} alt="react-redux-boilerplate - Logo" />
        <div className="nav-bar">
          <Link className="router-link" to="/">
            Wallet
          </Link>
          <Link className="router-link" to="/features">
            FAQ
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
