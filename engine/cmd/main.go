package main

import (
	"github.com/cali4888/rwallet/engine"
	"github.com/cali4888/rwallet/engine/bolt"
	"github.com/cali4888/rwallet/engine/zcash"
)

func main() {
	wm, err := bolt.NewWalletManaget()
	if err != nil {
		panic(err)
	}

	cm := &zcash.CoinManager{}

	app := engine.NewApp(wm, cm)

	updater := engine.NewUpdater(app)
	go updater.Run()

	err = app.StartServer()
	if err != nil {
		panic(err)
	}
}
