import "../pages/index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
  profileEditForm,
  addCardForm,
  cardAddButton,
  profileEditButton,
  formSettings
} from "../utils/constants.js";

// INSTANCES OF MY CLASSES

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

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  descriptionSelector: "#profile-description",
});

const editProfileForm = new FormValidator(formSettings, profileEditForm);
const addProfileForm = new FormValidator(formSettings, addCardForm);
const imagePopupWithImage = new PopupWithImage(".js-modal-popup-image");


function handleImageClick(cardData) {
  imagePopupWithImage.open({
    link: cardData.link,
    name: cardData.name,
  });
}

editProfilePopupWithForm.setEventListeners();
addCardPopupWithForm.setEventListeners();
imagePopupWithImage.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const currentUserData = userInfo.getUserInfo()
  editProfilePopupWithForm.setInputValues(currentUserData)
  editProfilePopupWithForm.open();
});

cardAddButton.addEventListener("click", () => {
  addCardPopupWithForm.open();
});

section.renderItems();
editProfileForm.enableValidation();
addProfileForm.enableValidation();