import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithFormSubmit from '../components/PopupWithFormSubmit.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import { openEditFrom, nameInput, jobInput, openAddForm } from '../utils/constants.js'
//import { handleCardClick } from '../utils/utils.js'
import './index.css';
import { Api } from '../components/Api.js'
import { ajaxPrefilter } from 'jquery'

const cardsConfig = {
    placesWrap: '.elements',
    cardSelector: '#card-template'
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
    headers: {
        authorization: 'ce70ff0c-5fe1-4423-971f-ea76dc4add5d',
        'Content-Type': 'application/json'
    }
}); 

let myUserId = null;

const cardsSection = new Section ({
    renderer: (item) => {
        cardsSection.addItem(createCard(item));
    }
},
    cardsConfig.placesWrap
);

const profileInfo = new UserInfo({name:'.profile__title', about:'.profile__subtitle'});

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
]).then(([userInfo, cards]) => {
    myUserId = userInfo._id;
    profileInfo.setUserInfo(userInfo);
    cardsSection.renderItems(cards);
})

const editProfilePopup = new PopupWithForm (
    '.popup_form_profile', 
    (profileData) => {
        profileInfo.setUserInfo(profileData);
        api.updateUserInfo(profileData);
        editProfilePopup.close();
    })

openEditFrom.addEventListener('click', function() {
    editProfilePopup.open();
    const userData = profileInfo.getUserInfo();
    nameInput.value = userData.name.textContent;
    jobInput.value = userData.about.textContent;
    profileFormValidator.clearErrorElement();
});  

/// Создание экземпляров классов для pop-up ///
const cardDeletePopup = new PopupWithFormSubmit('.popup_form_card-dlt');

function createCard(item) {
    const card = new Card({
        item: {...item, myUserId}},
        cardsConfig.cardSelector, 
        handleCardClick,
        handleCardDelete
    );
    return card.generateCard();
}

function handleCardDelete(item, cardElement) {
    cardDeletePopup.open();
    cardDeletePopup.setSubmitAction(() => {
        console.log(cardElement);
        api.deleteCard(item).then(() => {
            cardElement.remove();
            cardDeletePopup.close();
        }).catch((err) => {
            console.log(err);
        })
    })
}


const popupImage = new PopupWithImage('.popup_form_images');

function handleCardClick(cardName, cardLink) {
    popupImage.open(cardName, cardLink);
}


const addCardPopup = new PopupWithForm (
    '.popup_form_place', 
    (cardData) => {
        api.loadNewCard(cardData).then((item) => {
            cardsSection.addItem(createCard(item));
            addCardPopup.close();
        });
    })

openAddForm.addEventListener('click', function() {
    addCardPopup.open();
    placesFormValidator.clearErrorElement();
});



















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