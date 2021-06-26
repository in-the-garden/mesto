import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import { openEditFrom, openAddForm, initialCards } from '../utils/constants.js'
import { closePopupOverlay, handleCardClick } from '../utils/utils.js'
import './index.css';

document.addEventListener('mousedown', closePopupOverlay);

/// Создание экземпляров классов для pop-up ///

const cardsSection = new Section ({
    items: initialCards,
    renderer: (cardElement) => {
        const card = new Card(cardElement.name, cardElement.link, '#card-template', handleCardClick);
        return card.generateCard(); 
    }
    },
    '.elements'
    )

const addCardPopup = new PopupWithForm (
    '.popup_form_place', 
    (cardData) => {
        cardsSection.addItem(cardData);
        addCardPopup.close();
    })

const editForm = new UserInfo('.profile__title', '.profile__subtitle');

const editProfilePopup = new PopupWithForm (
    '.popup_form_profile', 
    (profileData) => {
        editForm.setUserInfo(profileData);
        editProfilePopup.close();
    })

// форма редактирования //
openEditFrom.addEventListener('click', function() {
    editProfilePopup.open();
    editForm.getUserInfo();
    profileFormValidator.clearErrorElement();
});

// форма добавления новой карточки //
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

