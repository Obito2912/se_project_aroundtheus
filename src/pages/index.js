import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];



// Elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector(".profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector("#cards-list");
const cardAddPopUp = document.querySelector(".js-add-popup");
const cardAddButton = document.querySelector("#add-button");
const cardTitleInput = document.querySelector("#card-title-input");
const cardLinkInput = document.querySelector("#card-link-input");
const addCardCloseButton = document.querySelector("#card-add-close-button");
const addCardForm = cardAddPopUp.querySelector(".js-add-card-form");
const previewImageCloseButton = document.querySelector(
  "#popup-image-close-button"
);

const formSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  modalButton: ".js-modal-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editProfileForm = new FormValidator(formSettings, profileEditForm);
const addProfileForm = new FormValidator(formSettings, addCardForm);
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  "#cards-list"
);

const editProfilePopupWithForm = new PopupWithForm(
  ".profile-edit-modal",
  (formValues) => {
    userInfo.setUserInfo({
      name: formValues.title,
      title: formValues.description,
    });
  }
);

const addCardPopupWithForm = new PopupWithForm(
  ".js-add-popup",
  (formValues) => {
    const newCardData = {
      name: formValues.title,
      link: formValues.link,
    };
    const newCardElement = createCard(newCardData);
    section.addItem(newCardElement);
  }
);

const imagePopupWithImage = new PopupWithImage(".js-modal-popup-image");

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  descriptionSelector: "#profile-description",
});

editProfilePopupWithForm.setEventListeners();
addCardPopupWithForm.setEventListeners();
imagePopupWithImage.setEventListeners();

editProfileForm.enableValidation();
addProfileForm.enableValidation();

section.renderItems();

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function handleImageClick(cardData) {
  imagePopupWithImage.open({
    link: cardData.link,
    name: cardData.name,
  });
}

profileEditButton.addEventListener("click", () => {
  editProfilePopupWithForm.open();
});

cardAddButton.addEventListener("click", () => {
  addCardPopupWithForm.open();
});

profileEditCloseButton.addEventListener("click", () =>
  editProfilePopupWithForm.close()
);

addCardCloseButton.addEventListener("click", () =>
  addCardPopupWithForm.close()
);

previewImageCloseButton.addEventListener("click", () =>
  imagePopupWithImage.close()
);
