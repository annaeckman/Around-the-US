import Modal from "./Modal";

export default class ModalConfirm extends Modal {
  constructor({ modalSelector }) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
  }

  handleDelete(handleDeleteSubmit) {
    this._handleDeleteSubmit = handleDeleteSubmit;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteSubmit();
      this.close();
    });
    super.setEventListeners();
  }
}
