import '../pages/index.css'; //импорт главного файла стилей
import {initialCards, createCard, deleteCard} from './cards.js'; // импорт массива и функций создания и удаления карточки
import {openModal, closeModal} from './modal.js'; // импорт функций открытия и закрытия модального окна

//Тут описана инициализация приложения и основная логика страницы: поиск DOM-элементов на странице и навешивание на них обработчиков событий; обработчики отправки форм, функция-обработчик события открытия модального окна для редактирования профиля; функция открытия модального окна изображения карточки.

// Основные переменные
const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const modalEdit = document.querySelector('.popup_type_edit');
const modalAdd = document.querySelector('.popup_type_new-card');
const modalImage = document.querySelector('.popup_type_image');

// Функция открытия модального окна изображения карточки
function openModalImage(card) {
  modalImage.querySelector('.popup__image').src = card.link;
  modalImage.querySelector('.popup__image').alt = card.name;
  modalImage.querySelector('.popup__caption').textContent = card.name;
  openModal(modalImage);
}

// Вывести карточки на страницу
initialCards.forEach(function (card) {
  cardsContainer.append(createCard(card, deleteCard, () => openModalImage(card)));
});

// Слушатели для модального окна
profileEditButton.addEventListener('click', () => openModal(modalEdit));
profileAddButton.addEventListener('click', () => openModal(modalAdd));
