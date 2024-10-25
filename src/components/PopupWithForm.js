import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._element.querySelector(".modal__form");
    this._inputList = [...this._form.querySelectorAll(".modal__input")];
   
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setInputValues(values){
    this._inputList.forEach((input)=>{
        input.value = values[input.name]
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._form.reset();
      this.close();
    });
  }
}
