class Card {
    constructor(name, link, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }
    
    _makeElements() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element');
        this._cardElement = cardTemplate.cloneNode('true');
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLikeClick);
        this._removeButton.addEventListener('click', this._handleRemoveClick);
        this._cardImage.addEventListener('click', () => this.handleCardClick(this._name, this._link));
    }

    _handleLikeClick = () => {
        this._likeButton.classList.toggle('element__heart-button_active');
    }

    _handleRemoveClick = () => {
        this._cardElement.remove();
    }

    generateCard() {
        this._makeElements();
        this._likeButton = this._cardElement.querySelector('.element__heart-button');
        this._removeButton = this._cardElement.querySelector('.element__remove-button');
        this._cardImage = this._cardElement.querySelector('.element__image');

        this._cardElement.querySelector('.element__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setEventListeners();
        return this._cardElement;
    }
}

export default Card 