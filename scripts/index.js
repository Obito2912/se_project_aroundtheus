const initialCards = [

    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    },

    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
    },

    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    },

    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    },

    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
    },

    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    }

];


// Elements     
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modalCloseButton = document.querySelector("#modal-close-button");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector("#cards-list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardAddPopUp = document.querySelector(".add-popup");
const cardAddButton = document.querySelector("#add-button");
const cardTitleInput = document.querySelector("#card-title-input");
const cardLinkInput = document.querySelector("#card-link-input");
const addCardCloseButton = document.querySelector("#card-add-close-button");
const addCardForm = cardAddPopUp.querySelector(".js-add-card-form");
const previewImageModal = document.querySelector(".modal__popup-image");
const previewImageCloseButton = document.querySelector("#popup-image-close-button");



// Functions
function closePopUp() {
    profileEditModal.classList.remove("modal_opened");
    cardAddPopUp.classList.remove("modal_opened");
    previewImageModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
    // clone the template element with all its content and store it in a cardElement variable
    const cardElement = cardTemplate.cloneNode(true);
    // access the card title and image and store them in variables
    const cardImageEl = cardElement.querySelector("#card-image");
    const cardTitleEl = cardElement.querySelector("#card-title");
    const likeButton = cardElement.querySelector(".card__like-button");

    // Find delete button
    const cardTrashButton = cardElement.querySelector(".card__trash-button");

    // Add the event listener to the delete button
        cardTrashButton.addEventListener("click", () => {
            cardElement.remove();
            });

    // add event listener for like
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__like-button_active");
        });

    // set the path to the image to the link field of the object
    cardImageEl.src = cardData.link;
    // set the image alt text to the name field of the object
    cardImageEl.alt = cardData.name;
    // set the card title to the name field of the object, too
    cardTitleEl.textContent = cardData.name;
    
    // Add event listener to the cardImage element
    cardImageEl.addEventListener("click", () => {
        openImageModal(cardData);
    });
    // OpenModal with previewImageModal
    function openImageModal(cardData) {
        const previewImageEl = previewImageModal.querySelector("img");
        const previewCaptionEl = previewImageModal.querySelector("figcaption");
        
        // Set the modal image source and alt text
        previewImageEl.src = cardData.link;
        previewImageEl.alt = cardData.name;
    
        // Set the modal caption text
        previewCaptionEl.textContent = cardData.name;
    
        // Show the modal
        previewImageModal.classList.add("modal_opened");
    }


    // return the ready HTML element with the filled-in data
    return cardElement;
}

// Event Handlers 
function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopUp();
}

function handleAddCardSubmit(e) {
    e.preventDefault();
    const cardData = {
        name: cardTitleInput.value,
        link: cardLinkInput.value,
    };
    const cardElement = getCardElement(cardData);
    cardListEl.prepend(cardElement);
    closePopUp();
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileEditModal.classList.add("modal_opened");
});

cardAddButton.addEventListener("click", () => {
    cardTitleInput.value = "";
    cardLinkInput.value = "";
    cardAddPopUp.classList.add("modal_opened");
});

profileEditCloseButton.addEventListener("click", closePopUp);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardCloseButton.addEventListener("click", closePopUp);
addCardForm.addEventListener("submit", handleAddCardSubmit);

previewImageCloseButton.addEventListener("click", closePopUp);

initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardListEl.append(cardElement);
});
