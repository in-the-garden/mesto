class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._makeElements();
        this._setEventListeners();
    }
    
    _makeElements() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element');
        this._cardElement = cardTemplate.cloneNode('true');

        this._likeButton = this._cardElement.querySelector('.element__heart-button');
        this._removeButton = this._cardElement.querySelector('.element__remove-button');
        this._cardImage = this._cardElement.querySelector('.element__image');

        this._popupImage = document.querySelector('.popup_form_images');
        this._closeButtonImage = document.querySelector('.popup__close_btn_image');

        this._cardElement.querySelector('.element__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLikeClick);
        this._removeButton.addEventListener('click', this._handleRemoveClick);
        this._cardImage.addEventListener('click', this._handleOpenFullImage);
        this._closeButtonImage.addEventListener('click', this._hadleCloseFullImage);
    }

    _handleLikeClick = () => {
        this._likeButton.classList.toggle('element__heart-button_active');
    }

    _handleRemoveClick = () => {
        this._cardElement.remove();
    }

    _handleOpenFullImage = () => {
        const fullImage = this._popupImage.querySelector('.popup__image');
        const imageTitle = this._popupImage.querySelector('.popup__title-image');

        this._openPopup(this._popupImage);
        fullImage.src = this._link;
        fullImage.alt = this._name;
        imageTitle.textContent = this._name;
    }

    _hadleCloseFullImage = () => {
        this._closePopup(this._popupImage);
    }

    _openPopup(popupForm) {
        popupForm.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._closePopupEsc);
    };

    _closePopup(popupForm) {
        popupForm.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._closePopupEsc);
    };

    _closePopupEsc = (evt) => {
        if (evt.key === 'Escape') {
            const popupOpen = document.querySelector('.popup_is-opened');
            this._closePopup(popupOpen);
        };
    }

    generateCard() {
        return this._cardElement;
    }
}

export default Card 