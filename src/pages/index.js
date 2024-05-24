import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import UserInfo from "../components/UserInfo.js";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalConfirm from "../components/ModalConfirm.js";
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
    renderer: (cardData) => {
      cardsSection.appendItem(createCard(cardData));
    },
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
  console.log("the button was clicked");
  avatarModal.open();
});

//FUNCTIONS:

function createCard(cardData) {
  const newCard = new Card(
    cardData,
    "#card-template",
    () => {
      imagePreviewModal.open(cardData);
    },
    (card) => {
      handleDeleteSubmit(card);
    },
    (card) => {
      handleLikeClick(card);
    }
  );

  return newCard.generateCard();
}

function handleProfileFormSubmit(inputValues) {
  //call method that updates button text
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
    });
  profileSubmitButtonElement.textContent = "Save";
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.url;

  api
    .addNewCard(name, link)
    .then((res) => {
      cardsSection.prependItem(createCard(res));
      cardModal.close();
      cardModal.modalForm.reset();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleEditAvatarFormSubmit(inputValues) {
  const link = inputValues.url;

  api
    .updateAvatar(link)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      avatarModal.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleDeleteSubmit(card) {
  console.log(card);
  deleteConfirmModal.open();
  deleteConfirmModal.handleDelete(() => {
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
  console.log(card);
  if (card.isLiked) {
    api
      .dislikeCard(card.id)
      .then(() => {
        card.handleLikeButton();
        card.isLiked = false;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  if (!card.isLiked) {
    api
      .likeCard(card.id)
      .then(() => {
        card.handleLikeButton();
        card.isLiked = true;
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
    userInfo.setUserInfo({
      nameInput: result.name,
      jobInput: result.about,
      linkInput: result.avatar,
    });
    //add a line about user avatar here?
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });
//above is a form for what i need to do for the card and user info...

//on initial page load, call getuserinfo method return object with user's name and avatar and job insert that into dom
//use userinfo class, modify add a method to set the avatar

//start with the handle functions
//in the handlers call relevant api function and then when that returns use a .then method, that's when i handle the updates to the user interface
//for the card, in the .then((in this callback fn is when i take the data from the response, and create a card add it to the dom, in the userinfo insert the values into relevant html elements))
//likes and deleting is more complicated, i'll prob get it after doing above

//in a real application, you wouldn't log the error to the console, you'd make it accesible to user..that's later
