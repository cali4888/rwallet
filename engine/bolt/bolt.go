package bolt

import (
	"encoding/json"
	"fmt"
	"github.com/cali4888/rwallet/engine"
	"github.com/coreos/bbolt"
	"time"
)

const (
	walletsBucket     = "wallets"
	coinsPricesBucket = "prices"
)

type coinPrice struct {
	Price      float64 `json:"price"`
	UpdateTime int64   `json:"update_time"`
}

type WalletManager struct {
	db *bolt.DB
}

func NewWalletManaget() (*WalletManager, error) {
	wm := &WalletManager{}

	db, err := bolt.Open("rwallet.db", 0600, nil)
	if err != nil {
		return nil, err
	}

	wm.db = db

	return wm, nil
}

func (w *WalletManager) Get(email string) (*engine.Wallet, error) {
	var wallet *engine.Wallet

	err := w.db.Update(func(tx *bolt.Tx) error {
		bucket, err := tx.CreateBucketIfNotExists([]byte(walletsBucket))
		if err != nil {
			return err
		}
		bytes := bucket.Get([]byte(email))
		if bytes == nil {
			return fmt.Errorf("Wallet with email:'%s' doesn't exist", email)
		}

		var tempWallet engine.Wallet
		err = json.Unmarshal(bytes, &tempWallet)
		if err != nil {
			wallet = nil
			return err
		}

		wallet = &tempWallet
		return nil
	})

	return wallet, err
}

func (w *WalletManager) Put(wallet *engine.Wallet) error {
	return w.db.Update(func(tx *bolt.Tx) error {
		bytes, err := json.Marshal(wallet)
		if err != nil {
			return err
		}

		bucket, err := tx.CreateBucketIfNotExists([]byte(walletsBucket))
		if err != nil {
			return err
		}

		return bucket.Put([]byte(wallet.Email), bytes)
	})
}

func (w *WalletManager) Delete(email string) error {
	return w.db.Update(func(tx *bolt.Tx) error {
		bucket, err := tx.CreateBucketIfNotExists([]byte(walletsBucket))
		if err != nil {
			return err
		}

		return bucket.Delete([]byte(email))
	})
}

func (w *WalletManager) SetCoinPrice(coinType string, price float64) error {
	return w.db.Update(func(tx *bolt.Tx) error {
		bucket, err := tx.CreateBucketIfNotExists([]byte(coinsPricesBucket))
		if err != nil {
			return err
		}

		coinPrice := coinPrice{
			Price:      price,
			UpdateTime: time.Now().Unix(),
		}

		bytes, err := json.Marshal(coinPrice)
		if err != nil {
			return err
		}

		return bucket.Put([]byte(coinType), bytes)
	})
}

func (w *WalletManager) GetCoinPrice(coinType string) (float64, error) {
	var coinp *coinPrice

	err := w.db.Update(func(tx *bolt.Tx) error {
		bucket, err := tx.CreateBucketIfNotExists([]byte(coinsPricesBucket))
		if err != nil {
			return err
		}

		bytes := bucket.Get([]byte(coinType))
		if bytes == nil {
			return fmt.Errorf("No price for:%s", coinType)
		}

		var tcoinp coinPrice
		err = json.Unmarshal(bytes, &tcoinp)
		if err != nil {
			return err
		}

		coinp = &tcoinp

		return bucket.Put([]byte(coinType), bytes)
	})

	if err != nil {
		return 0, err
	}

	return coinp.Price, nil
}
