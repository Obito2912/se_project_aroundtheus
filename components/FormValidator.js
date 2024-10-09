export default class FormValidator {
    constructor (settings, formElement) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._modalButton = settings.modalButton; 
        this._inactiveButtonClass = settings.inactiveButtonClass; 
        this._inputErrorClass = settings.inputErrorClass; 
        this._errorClass = settings.errorClass; 

        this._form = formElement;
        this._submitButton = this._form.querySelector(this._submitButtonSelector);
    }

    
    _showInputError(inputEl) {
        const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add(this._inputErrorClass);
        errorMessageEl.textContent = inputEl.validationMessage;
        errorMessageEl.classList.add(this._errorClass);
    }
    
    _hideInputError(inputEl) {
        const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(this._inputErrorClass);
        errorMessageEl.textContent = '';
        errorMessageEl.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputEl) {
        if(!inputEl.validity.valid) {
            return this._showInputError(inputEl);
        }
        this._hideInputError(inputEl);
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputEl) => !inputEl.validity.valid);
    }

    _toggleButtonState(inputEls) {
        if(this._hasInvalidInput(inputEls)) {
            this._disableSubmitButton();
            return;
        }
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
    }
    
    _disableSubmitButton() {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
      }

    _setEventListeners() {
        const inputEls = [...this._form.querySelectorAll(this._inputSelector)];
        inputEls.forEach((inputEl) => {
            inputEl.addEventListener("input", () => {
                this._checkInputValidity(inputEl);
                this._toggleButtonState(inputEls);
            });
        });
        this._toggleButtonState(inputEls);
    }

    enableValidation() {
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._disableSubmitButton();
        });
        this._setEventListeners();
    }
}