import request from 'utils/request';

/**
 * API request handler
 */

export function requestAvailableCoins() {
  const requestURL = 'http://localhost:8091/v1/supportedcoins';
  const options = {
    method: 'GET',
  };
  return request(requestURL, options);
}

export function requestCoins(walletID) {
  const requestURL = 'http://localhost:8091/v1/wallet/';
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: walletID,
    }
  };
  return request(requestURL, options);
}

export function createWallet(walletID) {
  const requestURL = 'http://localhost:8091/v1/wallet/create';
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: walletID,
    }
  };
  return request(requestURL, options);
}

export function requestAddCoin(walletID, type, address) {
  const requestURL = 'http://localhost:8091/v1/wallet/addcoin';
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: walletID,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type,
      address
    })
  };

  return request(requestURL, options);
}

export function requestRemoveCoin(walletID, type, address) {
  const requestURL = 'http://localhost:8091/v1/wallet/removecoin';
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: walletID,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type,
      address
    })
  };

  return request(requestURL, options);
}
