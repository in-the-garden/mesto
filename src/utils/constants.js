/// Объявление переменных для форм ///
export const openEditFrom = document.querySelector('.profile__edit-button');

export const nameInput = document.querySelector('.popup__input_info_name');
export const jobInput = document.querySelector('.popup__input_info_job');

export const openAddForm = document.querySelector('.profile__add-button');

// импорт картинок
const hawaii = new URL('../images/hawaii.jpg', import.meta.url);
const maunaLoa = new URL('../images/mauna-loa.jpg', import.meta.url);
const norway = new URL('../images/norway.jpg', import.meta.url);
const grandCanyon = new URL('../images/grand-canyon.jpg', import.meta.url);
const iceland = new URL('../images/iceland.jpg', import.meta.url);
const faroeIslands = new URL('../images/faroe-islands.jpg', import.meta.url);


/// Массив карточек "из коробки" ///
export const initialCards = [
  {
    name: 'Фареры',
    link: faroeIslands
  },
  {
    name: 'Исландия',
    link: iceland
  },
  {
    name: 'Большой каньон',
    link: grandCanyon
  },
  {
    name: 'Норвегия',
    link: norway
  },
  {
    name: 'Вулкан Мауна-Лоа',
    link: maunaLoa
  },
  {
    name: 'Гаваи',
    link: hawaii
  } 
];

  
