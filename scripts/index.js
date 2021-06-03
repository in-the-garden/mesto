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

class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._getTemplate();
        this._setEventListeners();
    }
    
    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element');
        this._cardElement = cardTemplate.cloneNode('true');

        this._likeButton = this._cardElement.querySelector('.element__heart-button');
        this._removeButton = this._cardElement.querySelector('.element__remove-button');
        this._imageTemplate = this._cardElement.querySelector('.element__image');
        this._closeButtonImage = document.querySelector('.popup__close_btn_image');

        this._cardElement.querySelector('.element__title').textContent = this._name;
        this._imageTemplate.src = this._link;
        this._imageTemplate.alt = this._name;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLikeClick);
        this._removeButton.addEventListener('click', this._handleRemoveClick);
        this._imageTemplate.addEventListener('click', this._handleOpenFullImage);
        this._closeButtonImage.addEventListener('click', this._hadleCloseFullImage);
    }

    _handleLikeClick = () => {
        this._likeButton.classList.toggle('element__heart-button_active');
    }

    _handleRemoveClick = () => {
        this._cardElement.remove();
    }

    _handleOpenFullImage = () => {
        openPopup(popupImage);
        fullImage.src = this._link;
        fullImage.alt = this._name;
        imageTitle.textContent = this._name;
    }

    _hadleCloseFullImage = () => {
        closePopup(popupImage);
    }

    generateCard() {
        return this._cardElement;
    }
}

/// Обработчики отправки формы ///
function handleSubmitEditForm (evt) {
    evt.preventDefault();    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
};

function handleSubmitAddForm (evt) {
    evt.preventDefault();    
    const data = {
        name: titleInput.value,
        link: linkInput.value
    }
    cardsContainer.prepend(createNewCard(data));
    closePopup(popupAdd);
};

/// Функция по давлению новой карточки на страницу + функция добавления карточек "из коробки" на страницу ///
function createNewCard(data) {
    const card = new Card(data.name, data.link, '#card-template');
    
    return card.generateCard();
   };

initialCards.forEach((item) => {
    const newCard = createNewCard(item);
    cardsContainer.append(newCard);
});


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


const profileFormValidator = new FormValidation(
    {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__save',
        inactiveButtonClass: 'popup__save_inactive', 
        inputErrorClass: 'popup__input_type_error',
        errorActiveClass: 'popup__input-error_active'
    },
    document.querySelector('form[name="profile-info"]')
);

profileFormValidator.enableValidation();

const placesFormValidator = new FormValidation(
    {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__save',
        inactiveButtonClass: 'popup__save_inactive', 
        inputErrorClass: 'popup__input_type_error',
        errorActiveClass: 'popup__input-error_active'
    },
    document.querySelector('form[name="new-place"]')
);

placesFormValidator.enableValidation();