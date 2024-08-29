// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, options) {

}

function checkInputValidity() {
    if(!inputEl.validity.valid) {
        showInputError(formEl, inputEl, options);
    } else {
        hideInputError(formEl, inputEl, options);
    }
}

function setEventListeners(formEl, options) {
    const {inputSelector} = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", (e) => {
            checkInputValidity(formEl, inputEl, options);
        });
    });
}

function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];
    formEls.forEach((formEl) => {
       setEventListeners(formEl, options);
        // loop for all inputs inside of form
        // loop through all the inputs to see if all are valid
            // if input is not valid
                // get validation message
                // add error class to input
                // display error message
                // disable button
            // if all inputs are valid
                // enable button
                // reset error messages
    });
}

const config = {
    formSelector: ".modal__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  };

  enableValidation(config);