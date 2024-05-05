export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._closeButton = this._modalElement.querySelector(".modal__close");
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", (evt) => this._handleEscClose(evt));
  }

  _handleEscClose(evt) {
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
    this._modalElement.addEventListener("mousedown", (evt) =>
      this._closeModalOverlay(evt)
    );

    this._closeButton.addEventListener("click", () => this.close());
  }
}
