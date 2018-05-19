package bolt

import (
	"encoding/json"
	"fmt"
	"github.com/cali4888/rwallet/engine"
	"github.com/coreos/bbolt"
)

const (
	walletsBucket = "wallets"
)

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
