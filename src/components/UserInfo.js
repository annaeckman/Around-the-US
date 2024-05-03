export default class UserInfo {
  constructor({ nameElementSelector, jobElementSelector }) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._jobElement = document.querySelector(jobElementSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
    //returns an object containing information about the user
    return this._userInfo;
  }

  setUserInfo({ nameInput, jobInput }) {
    this._nameElement = nameInput;
    this._jobElement = jobInput;
  }
}
