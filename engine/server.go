package engine

import (
	"encoding/json"
	"github.com/go-chi/chi"
	"log"
	"net/http"
)

type APIV1Response struct {
	Data  interface{} `json:"data"`
	Error string      `json:"error"`
}

type APIV1 struct {
	app *App
}

func NewApiV1(app *App) *APIV1 {
	return &APIV1{app: app}
}

func (a *APIV1) GetHandler() http.Handler {
	r := chi.NewRouter()
	r.Get("/v1/wallet/", a.getWallet)
	r.Get("/v1/wallet/create", a.createWallet)
	r.Post("/v1/wallet/addcoin", a.addCoin)
	r.Post("/v1/wallet/removecoin", a.removeCoin)
	r.Get("/v1/supportedcoins", a.getSupportedCoins)

	return r
}

func (a *APIV1) getWallet(w http.ResponseWriter, r *http.Request) {
	email := r.Header.Get("email")
	wallet, err := a.app.GetWallet(email)
	if err != nil {
		a.writeErr(w, err, http.StatusNotFound)
		return
	}

	a.writeOk(w, wallet)
}

func (a *APIV1) createWallet(w http.ResponseWriter, r *http.Request) {
	email := r.Header.Get("email")
	wallet, err := a.app.CreateWallet(email)
	if err != nil {
		a.writeErr(w, err, http.StatusInternalServerError)
		return
	}

	a.writeOk(w, wallet)
}

func (a *APIV1) addCoin(w http.ResponseWriter, r *http.Request) {
	email := r.Header.Get("email")

	decoder := json.NewDecoder(r.Body)
	var coin Coin
	err := decoder.Decode(&coin)
	if err != nil {
		a.writeErr(w, err, http.StatusBadRequest)
		return
	}

	wallet, err := a.app.AddCoin(email, coin)
	if err != nil {
		a.writeErr(w, err, http.StatusInternalServerError)
		return
	}

	a.writeOk(w, wallet)
}

func (a *APIV1) removeCoin(w http.ResponseWriter, r *http.Request) {
	email := r.Header.Get("email")

	decoder := json.NewDecoder(r.Body)
	var coin Coin
	err := decoder.Decode(&coin)
	if err != nil {
		a.writeErr(w, err, http.StatusBadRequest)
		return
	}

	wallet, err := a.app.RemoveCoin(email, coin)
	if err != nil {
		a.writeErr(w, err, http.StatusInternalServerError)
		return
	}

	a.writeOk(w, wallet)
}

func (a *APIV1) getSupportedCoins(w http.ResponseWriter, r *http.Request) {
	coins := a.app.SupportedCoins()
	a.writeOk(w, coins)
}

func (a *APIV1) writeOk(w http.ResponseWriter, data interface{}) {
	w.WriteHeader(http.StatusOK)

	response := APIV1Response{Data: data}
	encoder := json.NewEncoder(w)

	err := encoder.Encode(response)
	if err != nil {
		log.Fatal(err)
	}
}

func (a *APIV1) writeErr(w http.ResponseWriter, err error, code int) {
	w.WriteHeader(code)

	response := APIV1Response{}
	if err != nil {
		response.Error = err.Error()
	}

	encoder := json.NewEncoder(w)

	err = encoder.Encode(response)
	if err != nil {
		log.Fatal(err)
	}
}
