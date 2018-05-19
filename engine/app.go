package engine

import (
	"errors"
	"log"
	"net/http"
)

type App struct {
	walletManager WalletManager
	coinManagers  map[string]CoinManager
}

func NewApp(wm WalletManager, mngs ...CoinManager) *App {
	app := &App{
		walletManager: wm,
		coinManagers:  make(map[string]CoinManager),
	}

	for _, mg := range mngs {
		app.coinManagers[mg.Type()] = mg
	}

	return app
}

func (a *App) SupportedCoins() []string {
	var coins []string

	for k := range a.coinManagers {
		coins = append(coins, k)
	}

	return coins
}

func (a *App) CreateWallet(email string) (*Wallet, error) {
	wallet := &Wallet{
		Email: email,
		Coins: []Coin{},
	}

	err := a.walletManager.Put(wallet)
	return wallet, err
}

func (a *App) GetWallet(email string) (*Wallet, error) {
	return a.walletManager.Get(email)
}

func (a *App) AddCoin(email string, coin Coin) (*Wallet, error) {
	wallet, err := a.walletManager.Get(email)
	if err != nil {
		return nil, err
	}

	for _, c := range wallet.Coins {
		if c.Type == coin.Type && c.Address == coin.Address {
			return nil, errors.New("Such coin already added to this wallet")
		}
	}

	cm, ok := a.coinManagers[coin.Type]
	if !ok {
		return nil, errors.New("Unsupported coin")
	}

	balance, err := cm.Balance(coin.Address)
	if err != nil {
		return nil, err
	}

	coin.Balance = balance

	wallet.Coins = append(wallet.Coins, coin)
	err = a.walletManager.Put(wallet)

	return wallet, err
}

func (a *App) RemoveCoin(email string, coin Coin) (*Wallet, error) {
	wallet, err := a.walletManager.Get(email)
	if err != nil {
		return nil, err
	}

	for i, c := range wallet.Coins {
		if c.Type == coin.Type && c.Address == coin.Address {
			wallet.Coins = append(wallet.Coins[:i], wallet.Coins[i+1:]...)
			break
		}
	}

	err = a.walletManager.Put(wallet)
	return wallet, err
}

func (a *App) StartServer() error {
	log.Println("Server started at port 8091")
	api := NewApiV1(a)
	return http.ListenAndServe(":8091", api.GetHandler())
}
