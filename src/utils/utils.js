import Popup from '../components/Popup.js'
import PopupWithImage from '../components/PopupWithImage.js'

/// Функция закрытия pop-up ///
export function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        const popupSelector = `.${evt.target.classList[1]}`;
        const popup = new Popup(popupSelector);
        const popupForm = document.querySelector('.popup__form_submit_place');
        popupForm.reset();
        popup.close();
    };
};

/// Функция для открытия карточки в полный размер в сплывающем окне ///
export function handleCardClick(cardName, cardLink) {
    const totalImage = new PopupWithImage ('.popup_form_images', cardName, cardLink);
}

