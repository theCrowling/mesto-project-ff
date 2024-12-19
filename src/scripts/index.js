// Импорт функций
import '../pages/index.css';
import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getUserData, getCards, sendUserData, addNewCard, changeAvatar, deleteCardId, likeCardId, unlikeCardId} from './api.js';
// Объект с данными текущей карточки
const currentCardData = {
  cardId: '',
  card: '',
};
// Объект с конфигурацией валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
// Включение валидации форм
enableValidation(validationConfig);

//Тут описана инициализация приложения и основная логика страницы: поиск DOM-элементов на странице и навешивание на них обработчиков событий; обработчики отправки форм, функция-обработчик события открытия модального окна для редактирования профиля; функция открытия модального окна изображения карточки.

// Поиск DOM элементов
// Контейнер для карточек
const cardsContainer = document.querySelector('.places__list');
// Кнопки открытия модальных окон
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__image');
// Модальные окна
const modalTypeEdit = document.querySelector('.popup_type_edit');
const modalTypeAdd = document.querySelector('.popup_type_new-card');
const modalTypeImage = document.querySelector('.popup_type_image');
const modalCardImage = document.querySelector('.popup__image');
const modalCardTitle = document.querySelector('.popup__caption');
const modalCardAvatar = document.querySelector('.popup_type_image-avatar');
const modalCardAuthor = document.querySelector('.popup_type_image-author');
const modalCardTimer = document.querySelector('.popup_type_image-timer');
const modalAvatar = document.querySelector('.popup_type_edit-avatar');
const modalDelete = document.querySelector('.popup_type_delete-card');
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
// Форма удаления карточки
const deleteFormElement = document.forms['delete-card'];

// Слушатели открытия модального окна
profileEditButton.addEventListener('click', handleEditButtonClick);
profileAddButton.addEventListener('click', handleAddButtonClick);
profileAvatar.addEventListener('click', handleAvatarButtonClick);

// Функция обработчик открытия модального окна для редактирования профиля
function handleEditButtonClick() {
  newName.value = nameInput.textContent;
  newJob.value = jobInput.textContent;
  clearValidation(editFormElement, validationConfig);
  openModal(modalTypeEdit)
};

// Функция обработчик открытия модального окна для добавления новой карточки
function handleAddButtonClick() {
  newPlace.value = '';
  newLink.value = '';
  clearValidation(addFormElement, validationConfig);
  openModal(modalTypeAdd)
};

// Функция обработчик открытия модального окна для редактирования аватара
function handleAvatarButtonClick() {
  avatarInput.value = '';
  clearValidation(avatarFormElement, validationConfig);
  openModal(modalAvatar)
};

// Функция открытия модального окна изображения карточки
function openModalImage(card) {
  modalCardImage.src = card.link;
  modalCardImage.alt = card.name;
  modalCardTitle.textContent = card.name;
  modalCardAvatar.style.backgroundImage = `url(${card.owner.avatar})`;
  modalCardAuthor.textContent = card.owner.name;
  updateTimer(card);
  openModal(modalTypeImage);
};

// Функция открытия модального окна удаления карточки
function openModalDelete(cardId, cardElement) {
  currentCardData.cardId = cardId;
  currentCardData.card = cardElement;
  openModal(modalDelete);
};

// Функция обновления таймера
function updateTimer(card) {
  const now = new Date();
  const createdTime = new Date(card.createdAt); // Преобразуем строку в объект Date
  const timeDiff = now - createdTime; // Разница во времени в миллисекундах

  // Преобразуем разницу в человеко-читаемый формат
  // const seconds = Math.floor((timeDiff / 1000) % 60);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // Формируем строку для отображения
  let displayTime = '';
  if (minutes > 0) displayTime = `${minutes} мин. назад`;
  if (hours > 0) displayTime = `${hours} ч. назад`;
  if (days > 0) displayTime = `${days} дн. назад`;
  if (displayTime === '') displayTime = 'только что';

  modalCardTimer.textContent = displayTime;
}

// Функция изменения текста кнопки
function changeButtonText(form) {
  const modalButton = form.querySelector('.popup__button');
  const buttonTextMap = {
    'Сохранить': 'Сохранение...',
    'Сохранение...': 'Сохранить',
    'Да': 'Удаление...',
    'Удаление...': 'Да',
  };
  modalButton.textContent = buttonTextMap[modalButton.textContent] || 'Сохранить';
}

// Слушатели отправки форм
editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);
deleteFormElement.addEventListener('submit', (evt) => handleDeleteFormSubmit(evt, currentCardData.cardId, currentCardData.card));

// Функция-обработчик события submit для окна редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  changeButtonText(editFormElement);
  const userNewData = {
    name: newName.value,
    about: newJob.value
  };
  sendUserData(userNewData)
    .then((data) => {
      nameInput.textContent = data.name;
      jobInput.textContent = data.about;
      closeModal(modalTypeEdit);
    })
    .catch((err) => {
      console.error('Ошбика при отправке формы:', err);
    })
    .finally(() => {
      changeButtonText(editFormElement);
    })
};

// Функция-обработчик события submit для окна добавления новой карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  changeButtonText(addFormElement);
  const cardData = {
    name: newPlace.value,
    link: newLink.value,
    likes: [],
  };
  // Добавление карточки на сервер и получение данных карточки с сервера
  addNewCard(cardData)
    .then((serverCardData) => {
      const serverCardElement = createCard(serverCardData, serverCardData.owner, handleLikeCard, openModalImage, openModalDelete);
      cardsContainer.prepend(serverCardElement);
      closeModal(modalTypeAdd);
      addFormElement.reset();
    })
    .catch((err) => {
      console.error('Ошбика при добавлении карточки:', err);
    })
    .finally(() => {
      changeButtonText(addFormElement);
    })
};

// Функция-обработчик события submit для окна редактирования аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  changeButtonText(avatarFormElement);
  const newAvatar = avatarInput.value;
  changeAvatar(newAvatar)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      closeModal(modalAvatar);
    })
    .catch((err) => {
      console.error('Ошбика при изменении аватара:', err);
    })
    .finally(() => {
      changeButtonText(avatarFormElement);
    })
};

// Функция-обработчик события submit для окна удаления карточки
function handleDeleteFormSubmit(evt, cardId, cardElement) {
  evt.preventDefault();
  changeButtonText(deleteFormElement);
  deleteCardId(cardId)
    .then(() => {
      deleteCard(cardElement);
      closeModal(modalDelete);
    })
    .catch((err) => {
      console.error('Ошбика при удалении карточки:', err);
    })
    .finally(() => {
      changeButtonText(deleteFormElement)
    })
};

// Функция-обработчик события лайка карточки
function handleLikeCard(cardId, likeButton, counter) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    unlikeCardId(cardId)
      .then((res) => {
        counter.textContent = res.likes.length;
        likeCard(likeButton);
      })
      .catch((err) => {
        console.error('Ошбика при установке лайка:', err);
  })
  } else {
    likeCardId(cardId)
      .then((res) => {
        counter.textContent = res.likes.length;
        likeCard(likeButton);
      })
      .catch((err) => {
        console.error('Ошбика при установке лайка:', err);
      });
  }
};

// Получение карточек и данных пользователя с сервера
Promise.all([getCards(), getUserData()])
  .then(([cards, user]) => {
    cards.forEach((card) => renderCard(card, user))
    nameInput.textContent = user.name;
    jobInput.textContent = user.about;
    profileAvatar.style.backgroundImage = `url(${user.avatar})`;
  })
  .catch((err) => {
    console.error('Ошбика при получении данных сервера:', err);
  });

// Вывод карточек на страницу
function renderCard(card, user) {
  cardsContainer.append(createCard(card, user, handleLikeCard, openModalImage, openModalDelete));
};
