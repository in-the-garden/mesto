class Popup {
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
    }

    open() {
        this.popupElement.classList.add('popup_is-opened');
    }

    close() {
        this.popupElement.classList.remove('popup_is-opened');
    }

    _handleEscClose() {

    }

    setEventListeners() {

    }
}

export default Popup