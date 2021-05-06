/*
function togglePopup(event) {
    popup.classList.toggle('popup_is-opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent; 
}
*/
const popupEdit = document.querySelector('.popup__profile');
const openEditFrom = document.querySelector('.profile__edit-button ');
const closeEditForm = document.querySelector('.popup__close-btn_profile');

const popupAdd = document.querySelector('.popup__place');
const openAddForm = document.querySelector('.profile__add-button');
const closeAddForm = document.querySelector('.popup__close-btn_place');

let nameInput = popupEdit.querySelector('.popup__input_info_name');
let jobInput = popupEdit.querySelector('.popup__input_info_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle'); 

let titleInput = popupAdd.querySelector('.popup__input_place_title');
let linkInput = popupAdd.querySelector('.popup__input_place_link');
let elementTitle = document.q

function openPopup(popupForm) {
    if (popupForm === popupEdit) {
        popupForm.classList.add('popup_is-opened');
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent; 
    } else {
        popupForm.classList.add('popup_is-opened');
    }
}

function closePopup(popupForm) {
    popupForm.classList.remove('popup_is-opened');
}

let formElement = popupEdit.querySelector('.popup__form')

function formSubmitHandler (event) {
    event.preventDefault();    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupEdit.classList.remove('popup_is-opened');
}

openEditFrom.addEventListener('click', function() {
    openPopup(popupEdit);
});
closeEditForm.addEventListener('click', function() {
    closePopup(popupEdit);
});
formElement.addEventListener('submit', formSubmitHandler); 

openAddForm.addEventListener('click', function() {
    openPopup(popupAdd);
});
closeAddForm.addEventListener('click', function() {
    closePopup(popupAdd);
});

///// Template-часть

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template');

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

function createNewCard(cardName, cardLink) {
    const newCard = cardTemplate.content.querySelector('.element').cloneNode('true');
    newCard.querySelector('.element__title').textContent = cardName;
    newCard.querySelector('.element__image').src = cardLink;
    newCard.querySelector('.element__image').alt = cardName;
    return newCard;
}

initialCards.forEach((item) => {
    const newCard = createNewCard(item.name, item.link);
    cardsContainer.append(newCard);
});
/*
button.addEventListener('click', function() {
    const taskValue = input.value;

    tasksContainer.append(createTodo(taskValue));
    recalculateCount();
});


function formSubmitHandler (event) {
    event.preventDefault();    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupEdit.classList.remove('popup_is-opened');
}*/