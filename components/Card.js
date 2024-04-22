export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__heart-button_clicked");
    });

    this._deleteButton.addEventListener("click", () => {
      this_element.remove();
    });
  }

  generateCard() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._likeButton = this._element.querySelector(".card__heart-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}
