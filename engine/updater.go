package engine

import (
	"log"
	"time"
)

type Updater struct {
	app         *App
	rateLimiter <-chan time.Time
}

func NewUpdater(app *App) *Updater {
	return &Updater{
		app:         app,
		rateLimiter: time.Tick(time.Second / 5),
	}
}

func (u *Updater) Run() {
	log.Println("[DEBUG] Updater started")
	for {
		time.Sleep(2 * time.Minute)
		log.Println("[DEBUG] Update tick")

		err := u.updateBalance()
		if err != nil {
			log.Println(err)
		}
	}
}

func (u *Updater) updateBalance() error {
	emails, err := u.app.GetWalletEmails()
	if err != nil {
		return err
	}

	for _, email := range emails {
		log.Printf("[DEBUG] Start updating:%s", email)

		wallet, err := u.app.GetWallet(email)
		if err != nil {
			log.Printf("[ERROR] Can't get wallet err:%v", err)
			continue
		}

		err = u.updateWallet(wallet)
		if err != nil {
			log.Printf("[ERROR] Can't update wallet err:%v", err)
		}
	}

	return nil
}

func (u *Updater) updateWallet(wallet *Wallet) error {
	for i, coin := range wallet.Coins {
		<-u.rateLimiter
		api, err := u.app.GetCoinApi(coin.Type)
		if err != nil {
			log.Printf("[ERROR] Can't get coin api err:%v", err)
			continue
		}

		balance, err := api.Balance(coin.Address)
		if err != nil {
			log.Printf("[ERROR] Can' get balance err:%v", err)
		}

		wallet.Coins[i].Balance = balance
		wallet.Coins[i].LastUpdate = time.Now().Unix()
	}

	return u.app.PutWallet(wallet)
}
