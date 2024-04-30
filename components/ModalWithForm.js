import Popup from "./Modal";

class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalElement.querySelector("modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {}

  close() {}

  setEventListeners() {
    super.setEventListeners();
    //add submit listener
  }
}

// index.js
const newCardModal = new ModalWithForm("#add-card-modal", () => {});
newCardModal.open();

newCardModal.close();
