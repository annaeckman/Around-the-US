export class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._image = data.image;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  //the constructor creates an object with the name, image link, card selector, and function for handling an image click

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners(cardElement) {
    const cardImageEl = cardElement.querySelector(".card__image");
    cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    const cardLikeButton = cardElement.querySelector(".card__heart-button");
    cardLikeButton.addEventListener("click", () => {
      cardLikeButton.classList.toggle("card__heart-button_clicked");
    });

    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    cardDeleteButton.addEventListener("click", () => {
      cardElement.remove();
    });
  }

  generateCard() {
    const cardEl = this._getTemplate();
    cardEl.querySelector(".card__image").src = this._image;
    cardEl.querySelector(".card__title").textContent = this._name;

    this._setEventListeners(cardEl);

    return cardEl;
  }
}
