function clearErrorElement(popupForm, config) {
    const { formSelector, inputSelector, SubmitButtonSelector, ...restConfig } = config;
    const formElement = popupForm.querySelector(formSelector);
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(SubmitButtonSelector);
    toggleButtonState(inputList, buttonElement, restConfig);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, restConfig);
    });
}

function showInputError(formElement, inputElement, config) {
    const { inputErrorClass, errorActiveClass } = config;
    inputElement.classList.add(inputErrorClass);

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(errorActiveClass);
    errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(formElement, inputElement, config) {
    const { inputErrorClass, errorActiveClass } = config;
    inputElement.classList.remove(inputErrorClass);

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(errorActiveClass);
    errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, config) {
    if(inputElement.validity.valid) {
        hideInputError(formElement, inputElement, config);
    } else {
        showInputError(formElement, inputElement, config);
    };
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement, config) {
    const { ButtonInactiveClass } = config;
    console.log(config);
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(ButtonInactiveClass);  
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(ButtonInactiveClass);
    };
};

function setEventListeners(formElement, config) {
    const { inputSelector, SubmitButtonSelector, ...restConfig } = config;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(SubmitButtonSelector);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, restConfig);
            toggleButtonState(inputList, buttonElement, restConfig);
        });
    });
    //toggleButtonState(inputList, buttonElement);
};

function enableValidation(config) {
    const { formSelector, ...restConfig } = config;
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, restConfig);
    });
};