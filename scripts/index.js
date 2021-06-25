import FormValidator from './FormValidator.js'
import Card from './Card.js'
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'
import Popup from './Popup.js'


/// Объявление переменных для форм ///
const openEditFrom = document.querySelector('.profile__edit-button');
const openAddForm = document.querySelector('.profile__add-button');


/// Массив карточек "из коробки" ///
const initialCards = [
    {
      name: 'Гаваи',
      link: './images/hawaii.jpg'
    },
    {
      name: 'Вулкан Мауна-Лоа',
      link: './images/mauna-loa.jpg'
    },
    {
      name: 'Норвегия',
      link: './images/norway.jpg'
    },
    {
      name: 'Большой каньон',
      link: './images/grand-canyon.jpg'
    },
    {
      name: 'Исландия',
      link: './images/iceland.jpg'
    },
    {
      name: 'Фареры',
      link: './images/faroe-islands.jpg'
    }
  ];


/// Функция закрытия pop-up  ///
function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        const popupSelector = `.${evt.target.classList[1]}`;
        const popup = new Popup(popupSelector);
        const popupForm = document.querySelector('.popup__form_submit_place');
        popupForm.reset();
        popup.close();
    };
};

document.addEventListener('mousedown', closePopupOverlay);


/// Функция для открытия карточки в полный размер в сплывающем окне ///
function handleCardClick(cardName, cardLink) {
    const totalImage = new PopupWithImage ('.popup_form_images', cardName, cardLink);
}


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

