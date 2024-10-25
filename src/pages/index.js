import "../pages/index.css";
import Card from "../components/Card.js";
import { section } from "../utils/constants.js";

import {
  addCardPopupWithForm,
  editProfileForm,
  addProfileForm,
  editProfilePopupWithForm,
  imagePopupWithImage,
  userInfo,
  cardAddButton,
  profileEditButton
} from "../utils/constants.js";

editProfilePopupWithForm.setEventListeners();
addCardPopupWithForm.setEventListeners();
imagePopupWithImage.setEventListeners();

editProfileForm.enableValidation();
addProfileForm.enableValidation();

section.renderItems();

export function createCard(cardData) {
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
  const currentUserData = userInfo.getUserInfo()
  editProfilePopupWithForm.setInputValues(currentUserData)
  editProfilePopupWithForm.open(currentUserData);
});

cardAddButton.addEventListener("click", () => {
  addCardPopupWithForm.open();
});