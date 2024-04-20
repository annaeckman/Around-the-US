import FormValidator from "../components/FormValidator"
import Card from "../components/Card"

const initialCards = [
  {
    name: "Joshua Tree",
    link: "https://images.unsplash.com/photo-1596625820723-f0f481ff80be?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8am9zaHVhJTIwdHJlZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Emigrant Wilderness",
    link: "https://images.unsplash.com/photo-1446575983799-470c50cfdd25?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVtaWdyYW50JTIwd2lsZGVybmVzc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Redwood National Forest",
    link: "https://images.unsplash.com/photo-1698410531000-bdbb42dc388e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlZHdvb2QlMjBuYXRpb25hbCUyMGZvcmVzdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Marin Headlands",
    link: "https://images.unsplash.com/photo-1536687485033-90afd5b75fb8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hcmluJTIwaGVhZGxhbmRzfGVufDB8fDB8fHww",
  },
  {
    name: "Trinity Alps",
    link: "https://images.unsplash.com/photo-1648847672613-ca4f0351acae?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRyaW5pdHklMjBhbHBzfGVufDB8fDB8fHww",
  },
  {
    name: "Goat Rock Beach",
    link: "https://images.unsplash.com/photo-1578422212025-0e64506a0be9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29hdCUyMHJvY2slMjBiZWFjaHxlbnwwfHwwfHx8MA%3D%3D",
  },
];

// Elements
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//Wrappers:
const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const profileFormElement = document.forms["edit-profile-modal"];
const addCardFormElement = document.forms["add-card-form"];
const addCardFormInputs = addCardFormElement.querySelectorAll(".modal__input");

//
//Buttons and Nodes:
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = profileEditModal.querySelector(".modal__close");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const closeButtons = document.querySelectorAll(".modal__close");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const profileEditForm = profileEditModal.querySelector("#edit-profile-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const previewCloseButton = document.querySelector(
  "#preview-image-close-button"
);
const previewSubtitle = previewImageModal.querySelector(
  ".modal__picture-subtitle"
);

//Form Data:
const nameInput = document.querySelector("[name='name'");
const jobInput = document.querySelector("[name='job']");
const cardTitleInput = addCardFormElement.querySelector("[name='title']");
const cardUrlInput = addCardFormElement.querySelector("[name='url']");
//Functions:

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
  modal.addEventListener("mousedown", closeModalOverlay);
}

function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function closeModalEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  clearCardForm();
}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openEditProfileModal() {
  fillProfileForm();
  openModal(profileEditModal);
}

function clearCardForm() {
  addCardFormElement.reset();
}

function handleImageClick(this){
  const modalImage = document.querySelector(".modal__image-preview");
  modalImage.src = this._image.src;
  modalImage.alt = `Photo of ${this._name}`;
  previewSubtitle.textContent = this._name;
  openModal(previewImageModal);
}

initialCards
  .forEach((cardData) => {
    const renderCard = new Card(
      cardData,
      "#card-template",
      handleImageClick
    );
    cardListEl.prepend(renderCard.generateCard());
  })

  //Event Listeners:

  .profileEditButton.addEventListener("click", openEditProfileModal);
profileEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});
