export const initialCards = [
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