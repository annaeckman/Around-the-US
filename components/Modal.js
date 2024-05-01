export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._closeButtons = document.querySelectorAll(".modal__close");
  }

  open() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modal.classList.remove("modal_opened");
    this.removeEventListeners();
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _closeModalOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
      //this needs to be an arrow function bc it uses this...read max's article...
    }
  };

  setEventListeners() {
    this._modal.addEventListener("mousedown", this._closeModalOverlay);
    this._closeButtons.forEach((button) => {
      button.addEventListener("click", this.close);
    });
  }

  removeEventListeners() {
    document.removeEventListener("keydown", closeModalEscape);
    this.modal.removeEventListener("mousedown", closeModalOverlay);
  }
}
