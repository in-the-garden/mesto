const openPopupButton = document.querySelector('.profile__edit-button ');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');

let nameInput = document.querySelector('.popup__name')
let jobInput = document.querySelector('.popup__job')
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle'); 

function togglePopup(event) {
    popup.classList.toggle('popup_is-opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent; 
}

openPopupButton.addEventListener('click', togglePopup);
closePopupButton.addEventListener('click', togglePopup);


let formElement = document.querySelector('.popup__form')

function formSubmitHandler (event) {
    event.preventDefault();    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popup.classList.toggle('popup_is-opened');
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 
