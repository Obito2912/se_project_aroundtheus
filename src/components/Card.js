export default class Card {
  constructor({ name, link, _id, isLiked }, cardSelector, handleImageClick, handleDeleteClick, handleLikeClick) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this.isLiked = isLiked //true
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  getId(){
    return this._id
  }

  toggleLikeState(){
    this._likeButton.classList.toggle('card__like-button_active');
    this.isLiked = !this.isLiked
  }

  _setEventListener() {
    //'.card__like-button'
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    })

    //'.card__delete-button'
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._id, this._cardElement);
      });

    //'#card-image'
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    // get the card view
    this._cardImageElement = this._cardElement.querySelector("#card-image");
    this._likeButton = this._cardElement.querySelector('.card__like-button');

    // Assigning src, alt, and name to cards
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardElement.querySelector("#card-title").textContent = this._name;

    if (this.isLiked){
      this._likeButton.classList.add('card__like-button_active');
    }

    // set event listener
    this._setEventListener();
    // return the Card
    return this._cardElement;
  }
}
