import Popup from './Popup.js';
 
export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._imageElement = this._element.querySelector(".modal__img");
        this._captionElement = this._element.querySelector('figcaption');
    }

    open({link, name}) {
        this._imageElement.src = link;
        this._imageElement.alt = name;
        this._captionElement.textContent = name;
        super.open();
    }

}