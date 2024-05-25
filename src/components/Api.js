export default class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(`${url} + ${options}`).then(this._checkPromise);
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

  // getInitialCards() {
  //   return this._request(this._baseURL, "/cards");
  // }

  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        return this._checkPromise(res);
      })
      .then((userData) => {
        return userData;
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
    }).then((res) => {
      return this._checkPromise(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkPromise(res);
    });
  }

  likeCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        return this._checkPromise(res);
      })
      .then(() => console.log("Card has been liked"));
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        return this._checkPromise(res);
      })
      .then(() => console.log("Card is not yet liked"));
  }

  updateAvatar(link) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      console.log("this PATCH is working");
      return this._checkPromise(res);
    });
  }
}
