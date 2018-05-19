package zcash

import (
	"encoding/json"
	"fmt"
	"net/http"
)

const (
	coinType           = "ZEC"
	apiBalanceTemplate = "https://api.zcha.in/v2/mainnet/accounts/%s"
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

func (c *CoinManager) ValueInFiat() (float64, error) {
	panic("not implemented")
}
