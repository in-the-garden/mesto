class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    } 
    
    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _checkInputValidity(inputElement) {
        if(inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        };
    }

    _showInputError(inputElement) {
        inputElement.classList.add(this._config.inputErrorClass);
    
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.add(this._config.errorActiveClass);
        errorElement.textContent = inputElement.validationMessage;
    }
    
    _hideInputError(inputElement) {
        inputElement.classList.remove(this._config.inputErrorClass);
    
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.remove(this._config.errorActiveClass);
        errorElement.textContent = '';
    };

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.setAttribute('disabled', true);
            this._buttonElement.classList.add(this._config.inactiveButtonClass);  
        } else {
            this._buttonElement.removeAttribute('disabled');
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        };
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    enableValidation() {
        this._setEventListeners();
    }

    clearErrorElement() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
}

export default FormValidator