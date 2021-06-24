import FormValidator from './FormValidator.js'
import Card from './Card.js'
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'


/// Объявление переменных для окна редактирования профиля ///
const popupEdit = document.querySelector('.popup_form_profile');
const formProfile = popupEdit.querySelector('.popup__form_submit_profile')
const nameInput = popupEdit.querySelector('.popup__input_info_name');
const jobInput = popupEdit.querySelector('.popup__input_info_job');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle'); 

const openEditFrom = document.querySelector('.profile__edit-button');
const closeEditForm = document.querySelector('.popup__close_btn_profile');

/// Объявление переменных для окна добавления новой карточки ///
const popupAdd = document.querySelector('.popup_form_place');
const formPlaces = popupAdd.querySelector('.popup__form_submit_place');

const cardsContainer = document.querySelector('.elements');

const openAddForm = document.querySelector('.profile__add-button');
const closeAddForm = document.querySelector('.popup__close_btn_place');

/// Объявление переменных для открытия картинки в полный размер в сплывающем окне ///
const popupImage = document.querySelector('.popup_form_images');
const closeImage = document.querySelector('.popup__close_btn_image');

const fullImage = popupImage.querySelector('.popup__image');
const imageTitle = popupImage.querySelector('.popup__title-image');


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


/// Функция для открытия карточки в полный размер в сплывающем окне ///
function handleCardClick(cardName, cardLink) {
    const totalImage = new PopupWithImage ('.popup_form_images', cardName, cardLink);
}

//function handleOpenFullImage(cardName, cardLink) {
//    openPopup(popupImage); 
//    fullImage.src = cardLink;
//    fullImage.alt = cardName;
//    imageTitle.textContent = cardName;
//}
// закрытие карточки, открытой в полный размер //
//closeImage.addEventListener('click', function() {
//    closePopup(popupImage);
//});

/// Слушатели событий ///
// закрытие попапа кликом на оверлей //
document.addEventListener('mousedown', closePopupOverlay);

// окно редактирования //
openEditFrom.addEventListener('click', function() {
    editProfilePopup.open();
    editForm.getUserInfo();
    profileFormValidator.clearErrorElement();
});

// окно добавления новой карточки //
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



/// Функции открытия-закрытия pop-up ///
//function openPopup(popupForm) {
//    popupForm.classList.add('popup_is-opened');
//};
//
function closePopup(popupForm) {
    popupForm.classList.remove('popup_is-opened');
};


function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        const popuplist = Array.from(document.querySelectorAll('.popup')); 
        popuplist.forEach((popupElement) => { 
            closePopup(popupElement); 
        });
    };
};



/// Функция по давлению новой карточки на страницу ///( функция добавления карточек "из коробки" на страницу )///
//function createNewCard(data) {
//    const card = new Card(data.name, data.link, '#card-template', handleOpenFullImage);
//    
//    return card.generateCard();
//   };
//
//initialCards.forEach((item) => {
//    const newCard = createNewCard(item);
//    cardsContainer.append(newCard);
//});


/// Обработчики отправки формы ///
//function handleSubmitEditForm (evt) {
//    evt.preventDefault();    
//    profileName.textContent = nameInput.value;
//    profileJob.textContent = jobInput.value;
//    closePopup(popupEdit);
//};

//function handleSubmitAddForm (evt) {
//    evt.preventDefault();    
//    cardsSection.addItem({
//        name: titleInput.value,
//        link: linkInput.value
//    })
//    closePopup(popupAdd);
//};
