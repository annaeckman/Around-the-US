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
  profileFormElement,
  addCardFormElement,
  editAvatarFormElement,
  profileEditButton,
  profileAvatarButton,
  addNewCardButton,
  nameInput,
  jobInput,
  options,
} from "../components/utils/constants.js";

//VALIDATION INSTANTIATION:

const profileFormValidator = new FormValidator(options, profileFormElement);
profileFormValidator.enableValidation();
//use profileModal.modalForm here in order to not search the form?
//const profileFormValidator = new FormValidator(options, profileModal.modalForm);
//tried above and it did not work...still need to troubleshoot.
//same for below:

const addCardFormValidator = new FormValidator(options, addCardFormElement);
addCardFormValidator.enableValidation();

const editAvatarValidator = new FormValidator(options, editAvatarFormElement);
editAvatarValidator.enableValidation();

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
  profileFormValidator.resetValidation();
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

function handleProfileFormSubmit(inputValues) {
  //call method that updates button text
  profileModal.showButtonLoading("Saving...");
  api
    .updateUserInfo(inputValues.name, inputValues.job)
    .then((res) => {
      //call method to change back to default here
      userInfo.setUserInfo({
        nameInput: inputValues.name,
        jobInput: inputValues.job,
      });
      profileModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileModal.hideButtonLoading("Save");
    });
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.url;
  cardModal.showButtonLoading("Creating...");
  api
    .addNewCard(name, link)
    .then((res) => {
      cardsSection.prependItem(createCard(res));
      cardModal.close();
      cardModal.modalForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      cardModal.hideButtonLoading("Create");
    });
}

function handleEditAvatarFormSubmit(inputValues) {
  const link = inputValues.url;
  avatarModal.showButtonLoading("Saving...");
  api
    .updateAvatar(link)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      editAvatarValidator._disableButton();
      avatarModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarModal.hideButtonLoading("Save");
    });
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
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleLikeClick(card) {
  if (card._isLiked) {
    api
      .dislikeCard(card.id)
      .then(() => {
        card.handleLikeButton();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (!card._isLiked) {
    api
      .likeCard(card.id)
      .then(() => {
        card.handleLikeButton();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

//API INSTANTIATION:
const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ca9ab9de-2f85-4851-84ad-f764b1c60afd",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    result.forEach((cardData) => {
      cardsSection.appendItem(createCard(cardData));
    });
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

//initial user info from server and uploading to DOM
api
  .getUserInfo()
  .then((result) => {
    console.log(result);
    userInfo.setUserInfo({
      nameInput: result.name,
      jobInput: result.about,
    });
    userInfo.setUserAvatar({ linkInput: result.avatar });
  })
  .catch((err) => {
    console.error(err);
  });
