import Modal from "./Modal";

export default class ModalWithImage extends Modal {
  constructor() {
    this._modalImage = document.querySelector(".modal__image-preview");
    this._modalImageSubtitle = document.querySelector(
      ".modal__picture-subtitle"
    );
  }
  open(data) {
    //accept the name and link of the card as arguments and add an image to the popup and image src attribute and a caption for the image. call this method in the image click handler in index.js
    this._modalImage.src = data.image;
    this._modalImage.alt = `Photo of ${data.name}`;
    this._modalImageSubtitle.textContent = data.name;
    super.open();
  }
}

// //index.js
// const previewModal = new ModalWithImage();
// previewModal.setEventListeners();
