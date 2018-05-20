package engine

type WalletManager interface {
	Get(email string) (*Wallet, error)
	Put(wallet *Wallet) error
	Delete(email string) error
	SetCoinPrice(coinType string, price float64) error
	GetCoinPrice(coinType string) (float64, error)
}

type CoinApi interface {
	Type() string
	Balance(address string) (float64, error)
	CoinPriceInFiat() (float64, error)
}

type Wallet struct {
	Email string `json:"email"`
	Coins []Coin `json:"coins"`
}

type Coin struct {
	Type       string  `json:"type"`
	Name       string  `json:"name"`
	Address    string  `json:"address"`
	Balance    float64 `json:"balance"`
	CoinPrice  float64 `json:"coin_price"`
	LastUpdate int64   `json:"last_update"`
}
