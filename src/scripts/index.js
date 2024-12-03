// Импорт функций
import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
// Конфигурация валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//Тут описана инициализация приложения и основная логика страницы: поиск DOM-элементов на странице и навешивание на них обработчиков событий; обработчики отправки форм, функция-обработчик события открытия модального окна для редактирования профиля; функция открытия модального окна изображения карточки.

// Поиск DOM элементов
// Контейнер для карточек
const cardsContainer = document.querySelector('.places__list');
// Кнопки открытия модальных окон
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
// Модальные окна
const modalEdit = document.querySelector('.popup_type_edit');
const modalAdd = document.querySelector('.popup_type_new-card');
const modalImage = document.querySelector('.popup_type_image');
const modalCardImage = document.querySelector('.popup__image');
const modalCardTitle = document.querySelector('.popup__caption');
// Форма редактирования профиля
const editFormElement = document.forms['edit-profile'];
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');
const newName = editFormElement.elements.name;
const newJob = editFormElement.elements.description;
// Форма добавления новой карточки
const addFormElement = document.forms['new-place'];
const newPlace = addFormElement.elements['place-name'];
const newLink = addFormElement.elements['link'];

// Слушатели открытия модального окна
profileEditButton.addEventListener('click', handleEditButtonClick);
profileAddButton.addEventListener('click', handleAddButtonClick);

// Функция обработчик открытия модального окна для редактирования профиля
function handleEditButtonClick() {
  newName.value = nameInput.textContent;
  newJob.value = jobInput.textContent;
  clearValidation(editFormElement, validationConfig);
  openModal(modalEdit)
};

// Функция обработчик открытия модального окна для добавления новой карточки
function handleAddButtonClick() {
  newPlace.value = '';
  newLink.value = '';
  clearValidation(addFormElement, validationConfig);
  openModal(modalAdd)
};

// Функция открытия модального окна изображения карточки
function openModalImage(card) {
  modalCardImage.src = card.link;
  modalCardImage.alt = card.name;
  modalCardTitle.textContent = card.name;
  openModal(modalImage);
};

// Слушатели отправки форм
editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);

// Функция-обработчик события submit для окна редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = newName.value;
  jobInput.textContent = newJob.value;
  closeModal(modalEdit);
};

// Функция-обработчик события submit для окна добавления новой карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newPlace = addFormElement.elements['place-name'].value;
  const newLink = addFormElement.elements['link'].value;
  cardsContainer.prepend(createCard({name: newPlace, link: newLink}, deleteCard, likeCard, () => openModalImage({name: newPlace, link: newLink})));
  closeModal(modalAdd);
  addFormElement.reset();
};

// Вывод карточек на страницу
initialCards.forEach(function (card) {
  cardsContainer.append(createCard(card, deleteCard, likeCard, openModalImage));
});

// Включение валидации, все настройки передаются объектом конфигурации
enableValidation(validationConfig);
