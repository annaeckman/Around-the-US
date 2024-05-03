import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
import ModalWithImage from "../components/ModalWithImage.js";
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

//VALIDATION INSTANTIATION:

const profileFormValidator = new FormValidator(options, profileFormElement);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(options, addCardFormElement);
addCardFormValidator.enableValidation();

//SECTION CLASS INSTANTIATION:
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = new Card(cardData, "#card-template", () => {
        imagePreviewModal.open(cardData);
      });
      cardsSection.addItem(cardElement.generateCard());
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
});

addNewCardButton.addEventListener("click", () => {
  cardModal.open();
});

//FUNCTIONS:
function handleProfileFormSubmit(inputValues) {
  console.log(inputValues.name);
  profileName.textContent = inputValues.name;
  profileJob.textContent = inputValues.job;
  profileModal.close();
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.url;
  const cardData = { name, link };
  const newCard = new Card({ name, link }, "#card-template", () => {
    imagePreviewModal.open(cardData);
  });

  cardListEl.prepend(newCard.generateCard());
  cardModal.close();
}
