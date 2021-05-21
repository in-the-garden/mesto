function clearErrorElement(popupForm) {
    const formElement = popupForm.querySelector('.popup__form');
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });
}

function showInputError(formElement, inputElement) {
    inputElement.classList.add('popup__input_type_error');

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add('popup__input-error_active');
    errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(formElement, inputElement) {
    inputElement.classList.remove('popup__input_type_error');

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement) {
    if(inputElement.validity.valid) {
        hideInputError(formElement, inputElement);
    } else {
        showInputError(formElement, inputElement);
    };
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add('popup__save_inactive');  
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove('popup__save_inactive');
    };
};

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save');

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
    //toggleButtonState(inputList, buttonElement);
};

function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};