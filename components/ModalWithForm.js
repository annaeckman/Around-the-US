import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputElements = Array.from(
      this._modalForm.querySelectorAll("modal__input")
    );
  }

  _getInputValues() {
    inputValues = {};
    this._inputElements.forEach((input) => {
      inputValues[input.name] = value;
    });
    return inputValues;
  }

  close() {
    super.close();
    this._modalElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListeners("submit", () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

// // index.js:
// const newCardModal = new ModalWithForm(
//   "#add-card-modal",
//   handleAddCardFormSubmit
// );
// newCardModal.open();

// newCardModal.close();
