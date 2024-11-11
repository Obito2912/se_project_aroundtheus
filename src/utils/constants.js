// OBJECT WITH SELECTORS AND CLASSES
const formSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  modalButton: ".js-modal-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//   REGULAR VARIABLES TO GET TO MY HTML ELEMENTS

const cardAddPopUp = document.querySelector(".js-add-popup");
const addCardForm = cardAddPopUp.querySelector(".js-add-card-form");
const profileEditModal = document.querySelector(".profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardAddButton = document.querySelector("#add-button");
const profileEditButton = document.querySelector("#profile-edit-button");

// EXPORTS

export {
  cardAddButton,
  profileEditButton,
  profileEditForm,
  addCardForm,
  formSettings,
};
