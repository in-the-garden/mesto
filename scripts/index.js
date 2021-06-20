import FormValidator from './FormValidator.js'
import Card from './Card.js'
import Section from './Section.js'

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
const titleInput = popupAdd.querySelector('.popup__input_place_title');
const linkInput = popupAdd.querySelector('.popup__input_place_link');

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
        const card = new Card(cardElement.name, cardElement.link, '#card-template', handleOpenFullImage);
        return card.generateCard(); 
    }
    },
    '.elements'
    )

cardsSection.renderItems();

/// Функции открытия-закрытия pop-up ///
function openPopup(popupForm) {
    popupForm.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popupForm) {
    popupForm.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
};

function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpen = document.querySelector('.popup_is-opened');
        closePopup(popupOpen);
    };
}

function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        const popuplist = Array.from(document.querySelectorAll('.popup')); 
        popuplist.forEach((popupElement) => { 
            closePopup(popupElement); 
        });
    };
};


/// Обработчики отправки формы ///
function handleSubmitEditForm (evt) {
    evt.preventDefault();    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
};

function handleSubmitAddForm (evt) {
    evt.preventDefault();    
    cardsSection.addItem({
        name: titleInput.value,
        link: linkInput.value
    })
    closePopup(popupAdd);
};

/// Функция для открытия карточки в полный размер в сплывающем окне ///
function handleOpenFullImage(cardName, cardLink) {
    openPopup(popupImage);
    fullImage.src = cardLink;
    fullImage.alt = cardName;
    imageTitle.textContent = cardName;
}

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


/// Слушатели событий ///
// закрытие попапа кликом на оверлей //
document.addEventListener('mousedown', closePopupOverlay);

// окно редактирования //
openEditFrom.addEventListener('click', function() {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent; 
    profileFormValidator.clearErrorElement();
});

closeEditForm.addEventListener('click', function() {
    closePopup(popupEdit);
});

formProfile.addEventListener('submit', handleSubmitEditForm); 

// окно добавления новой карточки //
openAddForm.addEventListener('click', function() {
    openPopup(popupAdd);
    formPlaces.reset();
    ///titleInput.value = "";
    ///linkInput.value = "";
    placesFormValidator.clearErrorElement();
});

closeAddForm.addEventListener('click', function() {
    closePopup(popupAdd);
});

formPlaces.addEventListener('submit', handleSubmitAddForm); 

// закрытие карточки, открытой в полный размер //
closeImage.addEventListener('click', function() {
    closePopup(popupImage);
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

