const openPopupButton = document.querySelector('.profile__edit-button ');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');

let nameInput = popup.querySelector('.popup__input_info_name')
let jobInput = popup.querySelector('.popup__input_info_job')
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle'); 

/*
function togglePopup(event) {
    popup.classList.toggle('popup_is-opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent; 
}
*/

function openPopup(event) {
    popup.classList.add('popup_is-opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent; 
}

function closePopup(event) {
    popup.classList.remove('popup_is-opened');
}

let formElement = popup.querySelector('.popup__form')

function formSubmitHandler (event) {
    event.preventDefault();    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popup.classList.remove('popup_is-opened');
}

openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 
