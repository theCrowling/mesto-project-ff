// Импорт функций
import '../pages/index.css';
import {initialCards, createCard, deleteCard, likeCard} from './cards.js';
import {openModal, closeModal} from './modal.js';

//Тут описана инициализация приложения и основная логика страницы: поиск DOM-элементов на странице и навешивание на них обработчиков событий; обработчики отправки форм, функция-обработчик события открытия модального окна для редактирования профиля; функция открытия модального окна изображения карточки.

// Основные переменные
const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
// Модальные окна
const modalEdit = document.querySelector('.popup_type_edit');
const modalAdd = document.querySelector('.popup_type_new-card');
const modalImage = document.querySelector('.popup_type_image');

// Слушатели для модального окна
profileEditButton.addEventListener('click', () => openModal(modalEdit));
profileAddButton.addEventListener('click', () => openModal(modalAdd));

// Форма редактирования профиля
const editFormElement = document.forms['edit-profile'];
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');
editFormElement.elements.name.value = nameInput.textContent;
editFormElement.elements.description.value = jobInput.textContent;
// Форма добавления новой карточки
const addFormElement = document.forms['new-place'];
// Обработчики отправки форм
editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);

// Функция-обработчик события открытия модального окна для редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const newName = editFormElement.elements.name.value;
  const newJob = editFormElement.elements.description.value;
  nameInput.textContent = newName;
  jobInput.textContent = newJob;
  const openedModal = document.querySelector('.popup_is-opened');
  closeModal(openedModal)
};

// Функция-обработчик события открытия модального окна для добавления новой карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newPlace = addFormElement.elements['place-name'].value;
  const newLink = addFormElement.elements['link'].value;
  cardsContainer.prepend(createCard({name: newPlace, link: newLink}, deleteCard, likeCard, () => openModalImage({name: newPlace, link: newLink})));
  const openedModal = document.querySelector('.popup_is-opened');
  closeModal(openedModal)
  addFormElement.reset();
};

// Функция открытия модального окна изображения карточки
function openModalImage(card) {
  modalImage.querySelector('.popup__image').src = card.link;
  modalImage.querySelector('.popup__image').alt = card.name;
  modalImage.querySelector('.popup__caption').textContent = card.name;
  openModal(modalImage);
}

// Вывести карточки на страницу
initialCards.forEach(function (card) {
  cardsContainer.append(createCard(card, deleteCard, likeCard, () => openModalImage(card)));
});

