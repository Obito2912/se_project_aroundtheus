import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super({popupSelector});
        this._popupForm = this._popupElement.querySelector('.')
        this._handleFormSubmit = handleFormSubmit;

    }
}