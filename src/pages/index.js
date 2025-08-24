import "../pages/index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  profileEditForm,
  addCardForm,
  cardAddButton,
  profileEditButton,
  profilePictureContainer,
  profilePictureForm,
  formSettings,
} from "../utils/constants.js";

// INSTANCES OF MY CLASSES

const editProfileForm = new FormValidator(formSettings, profileEditForm);
const addProfileForm = new FormValidator(formSettings, addCardForm);
const editPictureProfileForm = new FormValidator(
  formSettings,
  profilePictureForm
);
const imagePopupWithImage = new PopupWithImage(".js-modal-popup-image");
const addCardPopupWithForm = new PopupWithForm(".js-add-popup", handleAddCard);

let section;
let cardToDelete = null;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5e486ce7-ebcd-4e77-af20-2ddda9723032",
    "Content-Type": "application/json",
  },
});

const editProfilePopupWithForm = new PopupWithForm(
  ".profile-edit-modal",
  (formValues) => {
    editProfilePopupWithForm.setSavingState(true);
    api
      .updateUserInfo({ name: formValues.title, about: formValues.description })
      .then((result) => {
        console.log("User info updated successfully: ", result);
        userInfo.setUserInfo(result);
        editProfilePopupWithForm.resetCloseForm();
        editProfileForm.disableSubmitButton();
      })
      .catch((err) => console.error("Failed to update user info: ", err))
      .finally(() => editProfilePopupWithForm.setSavingState(false));
  }
);

const updatePicturePopupWithForm = new PopupWithForm(
  ".js-change-picture-popup",
  (formValues) => {
    updatePicturePopupWithForm.setSavingState(true);
    api
      .updateUserPicture({ avatar: formValues.link })
      .then((result) => {
        console.log("User picture updated successfully: ", result);
        userInfo.setUserInfo(result);
        updatePicturePopupWithForm.resetCloseForm();
        editPictureProfileForm.disableSubmitButton();
      })
      .catch((err) => console.error("Failed to update picture: ", err))
      .finally(() => updatePicturePopupWithForm.setSavingState(false));
  }
);

const deleteConfirmationPopupWithForm = new PopupWithForm(
  ".js-delete-card-popup",
  () => {
    if (cardToDelete) {
      deleteConfirmationPopupWithForm.setSavingState(true);
      api
        .deleteCard(cardToDelete.cardId)
        .then(() => {
          cardToDelete.cardElement.remove();
          console.log("Card deleted successfully");
          cardToDelete = null;
          deleteConfirmationPopupWithForm.resetCloseForm();
        })
        .catch((err) => console.error("Failed to delete card: ", err))
        .finally(() => deleteConfirmationPopupWithForm.setSavingState(false));
    }
  }
);

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  descriptionSelector: "#profile-description",
  avatarSelector: "#profile-picture",
});

api
  .getInitialCards()
  .then((result) => {
    console.log("Cards fetched successfully:", result);
    section = new Section(
      {
        items: result,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          section.addItem(cardElement);
        },
      },
      "#cards-list"
    );
    section.renderItems();
  })
  .catch((err) => console.error("Failed to fetch cards:", err));

api
  .getUserInfo()
  .then((result) => {
    console.log("User info fetched successfully:", result);
    userInfo.setUserInfo(result);
  })
  .catch((err) => console.error("Failed to fetch user info:", err));

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLikeClick
  );
  return card.getView();
}

function handleAddCard(formValues) {
  addCardPopupWithForm.setSavingState(true);
  const newCardData = {
    name: formValues.title,
    link: formValues.link,
  };
  api.addCard(newCardData)
  .then((cardData) => {
    console.log('Card was successfully added: ', cardData)
    const newCardElement = createCard(cardData);
    section.addItem(newCardElement);
    addCardPopupWithForm.resetCloseForm();
    addProfileForm.disableSubmitButton();
  })
  .catch((err) => console.error('Failed to add card: ', err))
  .finally(() => addCardPopupWithForm.setSavingState(false));
}

function handleLikeClick(card) {
  const apiCall = card.isLiked
    ? api.dislikeCard(card.getId())
    : api.likeCard(card.getId());

  apiCall
    .then(() => {
      card.toggleLikeState();
    })
    .catch((err) => console.error("Failed to update like status: ", err));
}

function handleDeleteCard(cardId, cardElement) {
  cardToDelete = { cardId: cardId, cardElement: cardElement };
  deleteConfirmationPopupWithForm.open();
}

function handleImageClick(cardData) {
  imagePopupWithImage.open({
    link: cardData.link,
    name: cardData.name,
  });
}

editProfilePopupWithForm.setEventListeners();
addCardPopupWithForm.setEventListeners();
updatePicturePopupWithForm.setEventListeners();
deleteConfirmationPopupWithForm.setEventListeners();
imagePopupWithImage.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const currentUserData = userInfo.getUserInfo();
  editProfilePopupWithForm.setInputValues(currentUserData);
  editProfilePopupWithForm.open();
});

cardAddButton.addEventListener("click", () => {
  addCardPopupWithForm.open();
});

profilePictureContainer.addEventListener("click", () => {
  updatePicturePopupWithForm.open();
});

editProfileForm.enableValidation();
addProfileForm.enableValidation();
editPictureProfileForm.enableValidation();
