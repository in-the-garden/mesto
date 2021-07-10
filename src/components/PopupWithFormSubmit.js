import Popup from './Popup.js'

class PopupWithFormSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._setEventListeners();
    }

    setSubmitAction(action) {
        this._handleSubmitCallBack = action;
    }

    _setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitCallBack();
        })
        super.setEventListeners();
    }
}

export default PopupWithFormSubmit