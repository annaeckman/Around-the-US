export default class Api {
  constructor(baseURL) {
    this._baseURL = baseURL;
  }

  getInitialCards() {
    // ...
  }

  // other methods for working with the API
}

//this goes into index.js right?
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ca9ab9de-2f85-4851-84ad-f764b1c60afd",
    "Content-Type": "application/json",
  },
});
