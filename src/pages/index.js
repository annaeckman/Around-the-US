import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
import ModalWithImage from "../components/ModalWithImage.js";
import Api from "../components/Api.js";
import {
  cardListEl,
  profileFormElement,
  addCardFormElement,
  profileEditButton,
  addNewCardButton,
  profileName,
  profileJob,
  nameInput,
  jobInput,
  options,
  initialCards,
} from "../components/utils/constants.js";

//API INSTANTIATION:
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ca9ab9de-2f85-4851-84ad-f764b1c60afd",
    "Content-Type": "application/json",
  },
});

//VALIDATION INSTANTIATION:

const profileFormValidator = new FormValidator(options, profileFormElement);
profileFormValidator.enableValidation();
//use profileModal.modalForm here in order to not search the form?
//const profileFormValidator = new FormValidator(options, profileModal.modalForm);
//tried above and it did not work...still need to troubleshoot.
//same for below:

const addCardFormValidator = new FormValidator(options, addCardFormElement);
addCardFormValidator.enableValidation();

//SECTION CLASS INSTANTIATION:
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      cardsSection.appendItem(createCard(cardData));
    },
  },
  ".cards__list"
);
cardsSection.renderItems();

//PROFILE MODAL INSTANTIATION:
const profileModal = new ModalWithForm("#edit-modal", handleProfileFormSubmit);
profileModal.setEventListeners();

//NEW CARD MODAL INSTANTIATION:
const cardModal = new ModalWithForm("#add-card-modal", handleAddCardFormSubmit);
cardModal.setEventListeners();

//MODAL WITH IMAGE INSTANTIATION:
const imagePreviewModal = new ModalWithImage("#preview-image-modal");
imagePreviewModal.setEventListeners();

//USER INFO INSTANSTIATION:
const userInfo = new UserInfo({
  nameElementSelector: ".profile__name",
  jobElementSelector: ".profile__job",
});

//EVENT LISTENERS FOR MODAL BUTTONS:
profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name;
  jobInput.value = currentUser.job;

  profileModal.open();
  profileFormValidator.resetValidation();
});

addNewCardButton.addEventListener("click", () => {
  cardModal.open();
});

//FUNCTIONS:

function createCard(cardData) {
  const newCard = new Card(cardData, "#card-template", () => {
    imagePreviewModal.open(cardData);
  });
  return newCard.generateCard();
}

function handleProfileFormSubmit(inputValues) {
  console.log(inputValues.name);
  userInfo.setUserInfo({
    nameInput: inputValues.name,
    jobInput: inputValues.job,
  });
  profileModal.close();
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.url;
  const cardData = { name, link };

  cardsSection.prependItem(createCard(cardData));
  cardModal.close();
  cardModal.modalForm.reset();
}
