class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._image = data.image;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  generateCard() {
    //one public method that returns a fully functional card element populated with the appropriate data.
  }
}

//delete and like button handlers below:
// cardDeleteButton.addEventListener("click", () => {
//   cardElement.remove();
// });

// cardLikeButton.addEventListener("click", () => {
//   cardLikeButton.classList.toggle("card__heart-button_clicked");
// });

//handleImageClick(){
// cardImageEl.addEventListener("click", () => {
//   modalImage.src = cardImageEl.src;
//   modalImage.alt = `Photo of ${cardData.name}`;
//   previewSubtitle.textContent = cardData.name;
//   openModal(previewImageModal);
// });
// }
