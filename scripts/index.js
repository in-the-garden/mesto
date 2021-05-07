/*
function togglePopup(event) {
    popup.classList.toggle('popup_is-opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent; 
}
*/
const popupEdit = document.querySelector('.popup__profile');
const openEditFrom = document.querySelector('.profile__edit-button ');
const closeEditForm = document.querySelector('.popup__close_btn_profile');

const popupAdd = document.querySelector('.popup__place');
const openAddForm = document.querySelector('.profile__add-button');
const closeAddForm = document.querySelector('.popup__close_btn_place');


let nameInput = popupEdit.querySelector('.popup__input_info_name');
let jobInput = popupEdit.querySelector('.popup__input_info_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle'); 
let formProfile = popupEdit.querySelector('.popup__form_submit_profile')

let titleInput = popupAdd.querySelector('.popup__input_place_title');
let linkInput = popupAdd.querySelector('.popup__input_place_link');
let formPlaces = popupAdd.querySelector('.popup__form_submit_place');





function openPopup(popupForm) {
    if (popupForm === popupEdit) {
        popupForm.classList.add('popup_is-opened');
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent; 
    } else if (popupForm === popupAdd) {
        popupForm.classList.add('popup_is-opened');
        titleInput.value = "";
        linkInput.value = "";
    } else {
        popupForm.classList.add('popup_is-opened');
    }
}

function closePopup(popupForm) {
    popupForm.classList.remove('popup_is-opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();    
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupEdit.classList.remove('popup_is-opened');
}

function formAddNewCard (evt) {
    evt.preventDefault();    
    const cardName = titleInput.value;
    const cardLink = linkInput.value;
    cardsContainer.append(createNewCard(cardName, cardLink));
    popupAdd.classList.remove('popup_is-opened');
};

openEditFrom.addEventListener('click', function() {
    openPopup(popupEdit);
});
closeEditForm.addEventListener('click', function() {
    closePopup(popupEdit);
});
formProfile.addEventListener('submit', formSubmitHandler); 

openAddForm.addEventListener('click', function() {
    openPopup(popupAdd);
});
closeAddForm.addEventListener('click', function() {
    closePopup(popupAdd);
});

formPlaces.addEventListener('submit', formAddNewCard); 



///// Template-часть

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template');
const imageTemplate = cardTemplate.querySelector('.element__image');
const titleTemplate = cardTemplate.querySelector('.element__title');

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

  const popupImage = document.querySelector('.popup__images');
  const closeImage = document.querySelector('.popup__close_btn_image');

  let fullImage = popupImage.querySelector('.popup__image');
  let imageTitle = popupImage.querySelector('.popup__title-image');
  
 
function openPopuImage(cardName, cardLink) {
    popupImage.classList.add('popup_is-opened');
    fullImage.src = cardLink;
    fullImage.alt = cardName;
    imageTitle.textContent = cardName;
}



function createNewCard(cardName, cardLink) {
    function handleRemoveCard(evt) {
        evt.target.closest('.element').remove();
    };

    const newCard = cardTemplate.content.querySelector('.element').cloneNode('true');
    newCard.querySelector('.element__title').textContent = cardName;
    newCard.querySelector('.element__image').src = cardLink;
    newCard.querySelector('.element__image').alt = cardName;

    newCard.querySelector('.element__heart-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__heart-button_active');
    });

    const cardRemoveButton = newCard.querySelector('.element__remove-button');
    cardRemoveButton.addEventListener('click', handleRemoveCard);

    newCard.querySelector('.element__image').addEventListener('click', function() {
        openPopuImage(cardName, cardLink);
       });

   return newCard;
   }

initialCards.forEach((item) => {
    const newCard = createNewCard(item.name, item.link);
    cardsContainer.append(newCard);
});

closeImage.addEventListener('click', function() {
    closePopup(popupImage);
});
