import Popup from './Popup.js'

class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmitCb) {
        super(popupSelector);
        this._onSubmitCb = onSubmitCb;
        this._formElement = this._popupElement.querySelector('.popup__form');  

        this.setEventListeners();
    }

    _getInputValues() {
        const result = {};
        const inputs = Array.from(this._formElement.querySelectorAll('.popup__input'));

        inputs.forEach(input => {
            result[input.name] = input.value;
        });

        return result;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const cardData = this._getInputValues();
            this._onSubmitCb(cardData);
        });
    }
}

export default PopupWithForm