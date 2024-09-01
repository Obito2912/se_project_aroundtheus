// enabling validation by calling enableValidation()
// pass all the settings on call
const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    modalButton: ".js-modal-button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  };

function showInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, {inputErrorClass, errorClass}) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = '';
    errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
    if(!inputEl.validity.valid) {
        return showInputError(formEl, inputEl, options);
    }
        hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputList) {
    return inputList.some((inputEl) => !inputEl.validity.valid);
}

function toggleButtonState(inputEls, submitButton, {inactiveButtonClass}) {

    if(hasInvalidInput(inputEls)) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
        return;
    }
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;
    
}

function setEventListeners(formEl, options) {
    const {inputSelector, modalButton} = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector(modalButton);
    inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", (e) => {
            checkInputValidity(formEl, inputEl, options);
            toggleButtonState(inputEls, submitButton, options);
        });
    });
    toggleButtonState(inputEls, submitButton, options);
}

function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
       setEventListeners(formEl, options);
    });
}

enableValidation(config);
