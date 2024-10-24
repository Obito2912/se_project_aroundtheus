import Popup from './Popup.js';
 
export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._imageEl = this._element.querySelector("img");
        this._captionEl = this._element.querySelector("figcaption");
    }

    open({link, name}) {
        this._imageEl.src = link;
        this._imageEl.alt = name;
        this._captionEl.textContent = name;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
    }
}