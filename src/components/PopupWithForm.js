import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._element.querySelector(".modal__form");
    this._inputList = [...this._form.querySelectorAll(".modal__input")];
    this._formButton = this._form.querySelector(".modal__button");
    this._defaultButtonText = this._formButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setInputValues(values) {
    this._inputList.forEach((input) => {
      input.value = values[input.name];
    });
  }

  setSavingState(isSaving) {
    this._formButton.textContent = isSaving ? 'Saving...' : this._defaultButtonText;
  }

  resetCloseForm() {
    this.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
