//Wrappers:
export const cardListEl = document.querySelector(".cards__list");
export const profileFormElement = document.forms["edit-profile-form"];
export const addCardFormElement = document.forms["add-card-form"];

//
//Buttons and Nodes:
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const addNewCardButton = document.querySelector(".profile__add-button");
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");

//Form Data:
export const nameInput = document.querySelector("[name='name'");
export const jobInput = document.querySelector("[name='job']");

//Selectors and Classes:
export const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
