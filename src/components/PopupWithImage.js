import Popup from './Popup.js'

class PopupWithImage extends Popup {
    constructor(popupSelector,) {
        super(popupSelector); 
    }

    open(cardName, cardLink) {
        super.open();
        this._linkImage = this._popupElement.querySelector('.popup__image');
        this._nameImage = this._popupElement.querySelector('.popup__title-image');
        
        this._linkImage.src = cardLink;
        this._nameImage.alt = cardName;
        this._nameImage.textContent = cardName;
    }
}

export default PopupWithImage