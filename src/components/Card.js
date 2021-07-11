//import { set } from "core-js/core/dict";

class Card {
    constructor({item}, templateSelector, {onLikeClick, handleCardClick, handleCardDelete}) {
        this._item = item;
        this._name = item.name;
        this._link = item.link;
        this._likes = item.likes;
        this._currentUserId = item.myUserId;
        this._templateSelector = templateSelector;
        this._onLikeClick = onLikeClick;
        this.handleCardClick = handleCardClick;
        this.handleCardDelete = handleCardDelete;
    }
    
    _makeElements() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element');
        this._cardElement = cardTemplate.cloneNode('true');
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._onLikeClick(this._item, this._getIsLiked()));
        this._removeButton.addEventListener('click', this._handleRemoveClick);
        this._cardImage.addEventListener('click', () => this.handleCardClick(this._name, this._link));
    }

    _handleRemoveClick = () => {
        this.handleCardDelete(this._item, this._cardElement);
    }
    
    setLike() {
        this._likeButton.classList.toggle('element__heart-button_active');
    }

    setAmountLikes(res) {
        this._likes = res.likes;
        this._cardElement.querySelector('.element__counter').textContent = this._likes.length; 
    }

    _getIsLiked() {
        if (this._likes.some(like => like._id === this._currentUserId)) {
            return true;
        } else {
            return false;
            
        }
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

        if (this._item.owner._id !== this._currentUserId) {
            this._removeButton.remove();
        }

        this._getIsLiked();
        if (this._getIsLiked()) {
            this._likeButton.classList.add('element__heart-button_active');
        }
        this._cardElement.querySelector('.element__counter').textContent = this._likes.length;

        return this._cardElement;
    }
}

export default Card 