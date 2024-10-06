export default class Card {
    constructor({name, link}, cardSelector, handleImageClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;

    }

    _setEventListener() {
        //'.card__like-button'
        this._cardElement
        .querySelector('.card__like-button')
        .addEventListener('click', () => {
            this._handleLikeIcon();
        });

        //'.card__delete-button' 
        this._cardElement
        .querySelector('.card__trash-button')
        .addEventListener('click', () => {
            this._handleDeleteCard();
        });

        //'#card-image'
        this._cardImageElement
        .addEventListener('click', () => {
            this._handleImageClick(this);
        })
    }

    _handleLikeIcon() {
        this._cardElement.querySelector('.card__like-button')
        .classList.toggle('card__like-button_active');
    };

    _handleDeleteCard() {
        this._cardElement.remove();
    }

    getView() {
        this._cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector('.card')
        .cloneNode(true);
        
        // get the card view
        this._cardImageElement = this._cardElement
        .querySelector('#card-image');
        // Assigning src, alt, and name to cards
        this._cardImageElement.src = this._link;
        this._cardImageElement.alt = this._name;
        this._cardElement.querySelector('#card-title')
        .textContent = this._name;
    
        // set event listener
        this._setEventListener();
        // return the Card
        return this._cardElement;
    }
}