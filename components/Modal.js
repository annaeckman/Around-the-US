export default class Modal {
  constructor(modalSelector) {
    this.modalSelector = modalSelector;
  }

  open() {}

  close() {}

  _handleEscClose() {}

  setEventListeners() {
    //that adds a click event listener to the close icon of the popup. The modal window should also close when users click on the shaded area around the form.
  }
}
