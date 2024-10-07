import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

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

const cardData = {
}

const card = new Card(cardData, '#card-template', handleImageClick);
card.getView();

// Elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector("#cards-list");
const cardAddPopUp = document.querySelector(".add-popup");
const cardAddButton = document.querySelector("#add-button");
const cardTitleInput = document.querySelector("#card-title-input");
const cardLinkInput = document.querySelector("#card-link-input");
const addCardCloseButton = document.querySelector("#card-add-close-button");
const addCardForm = cardAddPopUp.querySelector(".js-add-card-form");
const previewImageModal = document.querySelector("#modal__popup-image");
const previewImageCloseButton = document.querySelector("#popup-image-close-button");
const previewImageEl = previewImageModal.querySelector("img");
const previewCaptionEl = previewImageModal.querySelector("figcaption");

// Functions
function openPopup(popUp) {
  popUp.classList.add('modal_opened');
  document.addEventListener("keydown", handleEscapeKey);
}

function closePopUp(popUp) {
  popUp.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function handleImageClick(cardData) {
  // Set the modal image source and alt text
  previewImageEl.src = cardData._link;
  previewImageEl.alt = cardData._name;

  // Set the modal caption text
  previewCaptionEl.textContent = cardData._name;

  // Show the modal
  openPopup(previewImageModal);
}

// Event Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };
  cardListEl.prepend(cardElement);
  closePopUp(cardAddPopUp);
  cardTitleInput.value = "";
  cardLinkInput.value = "";
}

// Event Listeners

// Function to close modals when Escape key is pressed
function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openModals = document.querySelectorAll(".modal_opened");
    openModals.forEach(closePopUp);
  }
}

// Function to close modals when clicking outside of them
function handleOverlayClick(event) {
  if (event.target.classList.contains("modal_opened")) {
    closePopUp(event.target);
  }
}

// Add event listeners to the modals
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", handleOverlayClick);
});

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddPopUp);
});

profileEditCloseButton.addEventListener("click", () =>
  closePopUp(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardCloseButton.addEventListener("click", () => closePopUp(cardAddPopUp));
addCardForm.addEventListener("submit", handleAddCardSubmit);

previewImageCloseButton.addEventListener("click", () =>
  closePopUp(previewImageModal)
);

initialCards.forEach((cardData) => {
  const card = new Card(cardData, '#card-template', handleImageClick);
  const cardElement = card.getView();                    
  cardListEl.append(cardElement);
});
