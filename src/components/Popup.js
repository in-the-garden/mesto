class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
    }

    open() {
        this._popupElement.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        };
    }

    _handleOverlayClose = (evt)  => { 
        if (evt.target.classList.contains('popup')) { 
            this.close();  
        };
    }

    setEventListeners() {
       this._popupElement.querySelector('.popup__close').addEventListener('click', () => this.close(this._popupElement));
       document.addEventListener('mousedown', this._handleOverlayClose); 
    }
}

export default Popup
