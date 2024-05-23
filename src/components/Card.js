export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._image = data.link;
    this.id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardElement = document.querySelector(cardSelector);
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
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

  handleTrashButton() {
    this._element.remove();
    this._element = null;
  }

  handleLikeButton() {
    this._likeButton.classList.toggle("card__heart-button_clicked");
  }
}
