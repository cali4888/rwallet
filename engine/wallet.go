package engine

type WalletManager interface {
	Get(email string) (*Wallet, error)
	Put(wallet *Wallet) error
	Delete(email string) error
}

type CoinManager interface {
	Type() string
	Balance(address string) (float64, error)
	ValueInFiat() (float64, error)
}

type Wallet struct {
	Email string `json:"email"`
	Coins []Coin `json:"coins"`
}

type Coin struct {
	Type        string  `json:"type"`
	Name        string  `json:"name"`
	Address     string  `json:"address"`
	Balance     float64 `json:"balance"`
	ValueInFiat float64 `json:"value_in_fiat"`
}
