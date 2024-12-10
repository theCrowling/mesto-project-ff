// Импорт функций
import '../pages/index.css';
// import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getUserData, getCards, sendUserData, addNewCard, changeAvatar} from './api.js';
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
const profileAvatar = document.querySelector('.profile__image');
// Модальные окна
const modalEdit = document.querySelector('.popup_type_edit');
const modalAdd = document.querySelector('.popup_type_new-card');
const modalImage = document.querySelector('.popup_type_image');
const modalCardImage = document.querySelector('.popup__image');
const modalCardTitle = document.querySelector('.popup__caption');
const modalEditAvatar = document.querySelector('.popup_type_edit-avatar');
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
// Форма редактирования аватара
const avatarFormElement = document.forms['edit-avatar'];
const avatarInput = avatarFormElement.elements['avatar'];

// Слушатели открытия модального окна
profileEditButton.addEventListener('click', handleEditButtonClick);
profileAddButton.addEventListener('click', handleAddButtonClick);
profileAvatar.addEventListener('click', handleAvatarButtonClick);

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

// Функция обработчик открытия модального окна для редактирования аватара
function handleAvatarButtonClick() {
  avatarInput.value = '';
  clearValidation(avatarFormElement, validationConfig);
  openModal(modalEditAvatar)
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
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

// Функция-обработчик события submit для окна редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = newName.value;
  jobInput.textContent = newJob.value;
  sendUserData({name: newName.value, about: newJob.value});
  closeModal(modalEdit);
};

// Функция-обработчик события submit для окна добавления новой карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newPlace = addFormElement.elements['place-name'].value;
  const newLink = addFormElement.elements['link'].value;
  const cardData = {
    name: newPlace,
    link: newLink,
    likes: [],
  };
  // Добавление карточки на сервер и получение данных карточки с сервера
  addNewCard(cardData)
    .then((serverCardData) => {
      // console.log('Ответ от сервера:', serverCardData);
      const serverCardElement = createCard(serverCardData, serverCardData.owner, deleteCard, likeCard, () => openModalImage(serverCardData));
      cardsContainer.prepend(serverCardElement);
    })
    .catch((err) => {
      console.error('Ошбика при добавлении карточки:', err);
    });
  closeModal(modalAdd);
  addFormElement.reset();
};

// Функция-обработчик события submit для окна редактирования аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const newAvatar = avatarFormElement.elements['avatar'].value;
  profileAvatar.style.backgroundImage = `url(${newAvatar})`;
  changeAvatar(newAvatar);
  closeModal(modalEditAvatar);
};

// Вывод карточек на страницу
// initialCards.forEach(function (card) {
//   cardsContainer.append(createCard(card, deleteCard, likeCard, openModalImage));
// });

// Включение валидации, все настройки передаются объектом конфигурации
enableValidation(validationConfig);

// Получение карточек и данных пользователя с сервера
Promise.all([getCards(), getUserData()])
  .then(([cards, user]) => {
    cards.forEach((card) => renderCard(card, user))
    nameInput.textContent = user.name;
    jobInput.textContent = user.about;
    profileAvatar.style.backgroundImage = `url(${user.avatar})`;
  })
  .catch((err) => {
    console.log(err);
  });

// Вывод карточек на страницу
function renderCard(card, user) {
  cardsContainer.append(createCard(card, user, deleteCard, likeCard, openModalImage));
};
