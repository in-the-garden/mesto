import Popup from './Popup.js'

class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmitCb) {
        super(popupSelector);
        this._onSubmitCb = onSubmitCb;
        this._formElement = this._popupElement.querySelector('.popup__form');  
        this._btnSave = this._popupElement.querySelector('.popup__save');

        this._setEventListeners();
    }

    _getInputValues() {
        const result = {};
        const inputs = Array.from(this._formElement.querySelectorAll('.popup__input'));

        inputs.forEach(input => {
            result[input.name] = input.value;
        });

        return result;
    }

    renderLoading(isLoading) {
        if(isLoading) {
            this._btnSave.textContent = "Сохранение...";
        } else {
            this._btnSave.textContent = "Сохранить";
        }
    }

    _setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading(true);
            const inputsData = this._getInputValues();
            this._onSubmitCb(inputsData);
        });
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}

export default PopupWithForm