import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalConfirm from "../components/ModalWithConfirm.js";
import Api from "../components/Api.js";
import {
  profileEditButton,
  profileAvatarButton,
  addNewCardButton,
  nameInput,
  jobInput,
  options,
} from "../components/utils/constants.js";

//API INSTANTIATION:
const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ca9ab9de-2f85-4851-84ad-f764b1c60afd",
    "Content-Type": "application/json",
  },
});

//initial cards uploading to DOM
api
  .getInitialCards()
  .then((result) => {
    result.forEach((cardData) => {
      cardsSection.appendItem(createCard(cardData));
    });
  })
  .catch(console.error);

//initial user info from server and uploading to DOM
api
  .getUserInfo()
  .then((result) => {
    userInfo.setUserInfo({
      nameInput: result.name,
      jobInput: result.about,
    });
    userInfo.setUserAvatar(result.avatar);
  })
  .catch(console.error);

//VALIDATION INSTANTIATION:

const formValidators = {};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(options, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(options);

//SECTION CLASS INSTANTIATION:
const cardsSection = new Section(
  {
    renderer: createCard,
  },
  ".cards__list"
);

//DELETE MODAL INSTANTIATION:
const deleteConfirmModal = new ModalConfirm({
  modalSelector: "#delete-confirm-modal",
});
deleteConfirmModal.setEventListeners();

//PROFILE MODAL INSTANTIATION:
const profileModal = new ModalWithForm("#edit-modal", handleProfileFormSubmit);
profileModal.setEventListeners();

//NEW CARD MODAL INSTANTIATION:
const cardModal = new ModalWithForm("#add-card-modal", handleAddCardFormSubmit);
cardModal.setEventListeners();

//AVATAR EDIT MODAL INSTANTIATION:
const avatarModal = new ModalWithForm(
  "#edit-avatar-modal",
  handleEditAvatarFormSubmit
);
avatarModal.setEventListeners();

//MODAL WITH IMAGE INSTANTIATION:
const imagePreviewModal = new ModalWithImage("#preview-image-modal");
imagePreviewModal.setEventListeners();

//USER INFO INSTANSTIATION:
const userInfo = new UserInfo({
  nameElementSelector: ".profile__name",
  jobElementSelector: ".profile__job",
  avatarSelector: ".profile__image",
});

//EVENT LISTENERS FOR MODAL BUTTONS:
profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  nameInput.value = currentUser.name;
  jobInput.value = currentUser.job;

  profileModal.open();
  formValidators["edit-profile-form"].resetValidation();
});

addNewCardButton.addEventListener("click", () => {
  cardModal.open();
});

profileAvatarButton.addEventListener("click", () => {
  avatarModal.open();
});

//FUNCTIONS:

function createCard(cardData) {
  const newCard = new Card(
    cardData, //data
    "#card-template", //cardSelector
    () => {
      //handleImageClick
      imagePreviewModal.open(cardData);
    },
    handleDeleteSubmit,
    handleLikeClick
  );

  return newCard.generateCard();
}

function handleSubmit(request, modalInstance, loadingText = "Saving...") {
  //change button text:
  modalInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      modalInstance.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      modalInstance.renderLoading(false);
    });
}

function handleProfileFormSubmit(inputValues) {
  // we create a function that returns a promise
  function makeRequest() {
    // `return` lets us use a promise chain `then, catch, finally` inside `handleSubmit`
    return api
      .updateUserInfo(inputValues.name, inputValues.job)
      .then((userData) => {
        userInfo.setUserInfo({
          nameInput: inputValues.name,
          jobInput: inputValues.job,
        });
      });
  }
  // Here we call the function passing the request, popup instance and if we need some other loading text we can pass it as the 3rd argument
  handleSubmit(makeRequest, profileModal);
}

function handleAddCardFormSubmit(inputValues) {
  function makeRequest() {
    return api.addNewCard(inputValues.title, inputValues.url).then((res) => {
      cardsSection.prependItem(createCard(res));
      cardModal.resetFormAndDisableButton();
    });
  }
  handleSubmit(makeRequest, cardModal, "Creating...");
}

function handleEditAvatarFormSubmit(inputValues) {
  function makeRequest() {
    return api.updateAvatar(inputValues.url).then((res) => {
      userInfo.setUserAvatar(res.avatar);
      formValidators["edit-avatar-form"].disableButton();
    });
  }
  handleSubmit(makeRequest, avatarModal);
}

function handleDeleteSubmit(card) {
  deleteConfirmModal.open();
  deleteConfirmModal.handleDelete(() => {
    //calls DELETE Method from API
    api
      .deleteCard(card.id)
      .then(() => {
        deleteConfirmModal.close();
        card.handleTrashButton();
      })
      .catch(console.error);
  });
}

function handleLikeClick(card) {
  if (card.isLiked) {
    api
      .dislikeCard(card.id)
      .then(() => {
        card.handleLikeButton();
      })
      .catch(console.error);
  }
  if (!card.isLiked) {
    api
      .likeCard(card.id)
      .then(() => {
        card.handleLikeButton();
      })
      .catch(console.error);
  }
}
