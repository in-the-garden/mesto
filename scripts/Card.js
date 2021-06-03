class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._getTemplate();
        this._setEventListeners();
    }
    
    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element');
        this._cardElement = cardTemplate.cloneNode('true');

        this._likeButton = this._cardElement.querySelector('.element__heart-button');
        this._removeButton = this._cardElement.querySelector('.element__remove-button');
        this._imageTemplate = this._cardElement.querySelector('.element__image');
        this._closeButtonImage = document.querySelector('.popup__close_btn_image');

        this._cardElement.querySelector('.element__title').textContent = this._name;
        this._imageTemplate.src = this._link;
        this._imageTemplate.alt = this._name;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLikeClick);
        this._removeButton.addEventListener('click', this._handleRemoveClick);
        this._imageTemplate.addEventListener('click', this._handleOpenFullImage);
        this._closeButtonImage.addEventListener('click', this._hadleCloseFullImage);
    }

    _handleLikeClick = () => {
        this._likeButton.classList.toggle('element__heart-button_active');
    }

    _handleRemoveClick = () => {
        this._cardElement.remove();
    }

    _handleOpenFullImage = () => {
        openPopup(popupImage);
        fullImage.src = this._link;
        fullImage.alt = this._name;
        imageTitle.textContent = this._name;
    }

    _hadleCloseFullImage = () => {
        closePopup(popupImage);
    }

    generateCard() {
        return this._cardElement;
    }
}

export default Card 