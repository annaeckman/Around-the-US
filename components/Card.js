export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  getView() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._likeButton = this._element.querySelector(".card__heart-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._deleteButton = this._element.querySelector(".card__delete-button");
  }

  // _getTemplate() {
  //   const cardElement = document
  //     .querySelector(this._cardSelector)
  //     .content.querySelector(".card")
  //     .cloneNode(true);

  //   return cardElement;
  // }

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
    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
    this._setEventListeners();
  }
}
