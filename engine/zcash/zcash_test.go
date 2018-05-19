package zcash

import (
	"testing"
)

func TestBalance(t *testing.T) {
	cm := CoinManager{}
	balance, err := cm.Balance("t3Vz22vK5z2LcKEdg16Yv4FFneEL1zg9ojd")
	if err != nil {
		t.Fatal(err)
	}

	t.Log(balance)
}
