export default class Modal {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(modalSelector);
    this._closeButtons = document.querySelectorAll(".modal__close");
  }

  open() {
    this._modal.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", closeModalEscape);
    this.modal.removeEventListener("mousedown", closeModalOverlay);
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _closeModalOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    //that adds a click event listener to the close icon of the popup. The modal window should also close when users click on the shaded area around the form.
    document.addEventListener("keydown", this._handleEscClose);
    this._modal.addEventListener("mousedown", this._closeModalOverlay);
    this._closeButtons.forEach((button) => {
      button.addEventListener("click", this.close);
    });
  }
}
