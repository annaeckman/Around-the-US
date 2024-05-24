import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });
    this.modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputElements = Array.from(
      this.modalForm.querySelectorAll(".modal__input")
    );
    this._modalSubmitButton = this._modalElement.querySelector(
      ".modal__submit-button"
    );
  }

  _getInputValues() {
    const inputValues = {};
    this._inputElements.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.modalForm.addEventListener("submit", () => {
      // this._modalSubmitButton.textContent = "Saving...";
      this._handleFormSubmit(this._getInputValues());
    });
  }

  showButtonLoading(text) {
    this._modalSubmitButton.textContent = text;
  }

  hideButtonLoading(defaultText) {
    this._modalSubmitButton.textContent = defaultText;
  }

  //add method with arguemnt that includes value that i want it
  //to change it to that updates the button text(pass true or false if
  // true say saving if lfalse say default)
}
