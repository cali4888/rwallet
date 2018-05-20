package zcash

import (
	"encoding/json"
	"fmt"
	"net/http"
)

const (
	coinType           = "ZEC"
	apiBalanceTemplate = "https://api.zcha.in/v2/mainnet/accounts/%s"
	apiPriceURL        = "https://min-api.cryptocompare.com/data/price?fsym=ZEC&tsyms=USD"
)

type zchaAccountResponse struct {
	Address    string  `json:"address"`
	Balance    float64 `json:"balance"`
	FirstSeen  int     `json:"firstSeen"`
	LastSeen   int     `json:"lastSeen"`
	MinedCount int     `json:"minedCount"`
	RecvCount  int     `json:"recvCount"`
	SentCount  int     `json:"sentCount"`
	TotalRecv  float64 `json:"totalRecv"`
	TotalSent  float64 `json:"totalSent"`
}

type CoinManager struct {
	http.Client
}

func (c *CoinManager) Balance(address string) (float64, error) {
	url := fmt.Sprintf(apiBalanceTemplate, address)
	r, err := c.Get(url)
	if err != nil {
		return 0, err
	}

	decoder := json.NewDecoder(r.Body)

	var apiResp zchaAccountResponse
	err = decoder.Decode(&apiResp)
	if err != nil {
		return 0, err
	}

	return apiResp.Balance, nil
}

func (c *CoinManager) Type() string {
	return coinType
}

func (c *CoinManager) CoinPriceInFiat() (float64, error) {
	r, err := c.Get(apiPriceURL)
	if err != nil {
		return 0, err
	}

	decoder := json.NewDecoder(r.Body)

	var apiResp map[string]float64
	err = decoder.Decode(&apiResp)
	if err != nil {
		return 0, err
	}

	v, ok := apiResp["USD"]
	if !ok {
		return 0, fmt.Errorf("Api err")
	}

	return v, nil
}
