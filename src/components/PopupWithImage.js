import Popup from './Popup.js'

class PopupWithImage extends Popup {
    constructor(popupSelector, name, link) {
        super(popupSelector);
        this._name = name;
        this._link = link;   

        this.open();
        this.setEventListeners();
    }

    open() {
        super.open();
        this._linkImage = this._popupElement.querySelector('.popup__image');
        this._nameImage = this._popupElement.querySelector('.popup__title-image');
        
        this._linkImage.src = this._link;
        this._nameImage.alt = this._name;
        this._nameImage.textContent = this._name;
    }

    close() {
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
     }
}

export default PopupWithImage