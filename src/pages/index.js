import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import { openEditFrom, nameInput, jobInput, openAddForm, openDeleteForm, initialCards } from '../utils/constants.js'
//import { handleCardClick } from '../utils/utils.js'
import './index.css';
import { Api } from '../components/Api.js'

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
    headers: {
        authorization: 'ce70ff0c-5fe1-4423-971f-ea76dc4add5d',
        'Content-Type': 'application/json'
    }
}); 

api.getUserInfo()
    .then((data) => {
        const userInfo = new UserInfo({name:'.profile__title', about:'.profile__subtitle'});
        userInfo.setUserInfo(data);

        const editProfilePopup = new PopupWithForm (
            '.popup_form_profile', 
            (profileData) => {
                userInfo.setUserInfo(profileData);
                api.updateUserInfo(profileData);
                editProfilePopup.close();
            })

        openEditFrom.addEventListener('click', function() {
            editProfilePopup.open();
            const userData = userInfo.getUserInfo();
            nameInput.value = userData.name.textContent;
            jobInput.value = userData.about.textContent;
            profileFormValidator.clearErrorElement();
        });    
    })
    .catch((err) => {
        console.log('Ошибка', err);
    });

api.getInitialCards()
    .then((data) => {
        const cardsSection = new Section ({
            items: data,
            renderer: (item) => {
                const cardElement = createCard(item); 
                cardsSection.addItem(cardElement);
            }
            },
            '.elements'
            )
        
        cardsSection.renderItems();

        const addCardPopup = new PopupWithForm (
            '.popup_form_place', 
            (cardData) => {
                const cardElement = createCard(cardData);
                cardsSection.addItem(cardElement);
                api.loadNewCard(cardData);
                addCardPopup.close();
            })

        openAddForm.addEventListener('click', function() {
            addCardPopup.open();
            placesFormValidator.clearErrorElement();
        });
    })
    .catch((err) => {
        console.log('Ошибка', err);
    });


const cardDeletePopup = new PopupWithForm (
    '.popup_form_card-dlt',
    () => {
        cardDeletePopup.close();
    });

//openDeleteForm.addEventListener('click', function() {
//    cardDeletePopup.open();
//});


/// Создание экземпляров классов для pop-up ///
function createCard(item) {
    const card = new Card(item.name, item.link, '#card-template', handleCardClick);
    return card.generateCard();
}

//const cardsSection = new Section ({
//    items: initialCards,
//    renderer: (item) => {
//        const cardElement = createCard(item); 
//        cardsSection.addItem(cardElement);
//    }
//    },
//    '.elements'
//    )
//
//cardsSection.renderItems();

//const addCardPopup = new PopupWithForm (
//    '.popup_form_place', 
//    (cardData) => {
//        const cardElement = createCard(cardData);
//        cardsSection.addItem(cardElement);
//        addCardPopup.close();
//    })

//const editProfilePopup = new PopupWithForm (
//    '.popup_form_profile', 
//    (profileData) => {
//        userInfo.setUserInfo(profileData);
//        editProfilePopup.close();
//    })
//
const popupImage = new PopupWithImage('.popup_form_images');

function handleCardClick(cardName, cardLink) {
    popupImage.open(cardName, cardLink);
}

//const userInfo = new UserInfo({name:'.profile__title', job:'.profile__subtitle'});

// форма редактирования //
//openEditFrom.addEventListener('click', function() {
//    editProfilePopup.open();
//    const userData = userInfo.getUserInfo();
//    nameInput.value = userData.name;
//    jobInput.value = userData.job
//    profileFormValidator.clearErrorElement();
//});

// форма добавления новой карточки //
//openAddForm.addEventListener('click', function() {
//    addCardPopup.open();
//    placesFormValidator.clearErrorElement();
//});

/// Данные для валидации форм ///
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive', 
    inputErrorClass: 'popup__input_type_error',
    errorActiveClass: 'popup__input-error_active'
}

// валидация полей формы редактирования профайла //
const profileFormValidator = new FormValidator(
    config,
    document.querySelector('form[name="profile-info"]')
);

profileFormValidator.enableValidation();

// валидация полей формы добавления новой карточки //
const placesFormValidator = new FormValidator(
    config,
    document.querySelector('form[name="new-place"]')
);

placesFormValidator.enableValidation();

