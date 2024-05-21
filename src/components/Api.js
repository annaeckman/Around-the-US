export default class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _checkPromise(res) {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkPromise(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkPromise(res);
    });
  }

  updateUserInfo(name, about) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      return this._checkPromise(res);
    });
  }

  addNewCard(name, link) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }
}

//this goes into index.js putting it here for reference...
// const api = new Api({
//   baseURL: "https://around-api.en.tripleten-services.com/v1",
//   headers: {
//     authorization: "ca9ab9de-2f85-4851-84ad-f764b1c60afd",
//     "Content-Type": "application/json",
//   },
// });

// my authorization code for reference:
// headers: {
//   authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
// },
