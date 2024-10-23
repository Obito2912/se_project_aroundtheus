export default class Popup {
    constructor(selector) {
        this._element = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
    }

    open() {
        this._element.classList.add("modal_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._element.classList.remove("modal_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._element.addEventListener("click", this.handleOverlayClick);
    }

    handleOverlayClick(event) {
        if (event.target.classList.contains("modal_opened")) {
            this.close();
        }
    }
}