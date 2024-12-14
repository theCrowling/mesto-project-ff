// Импорт функций
import '../pages/index.css';
import {createCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getUserData, getCards, sendUserData, addNewCard, changeAvatar, deleteCardId, likeCardId, unlikeCardId} from './api.js';
// Конфигурация валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
// Включение валидации по объекту конфигурации
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
const modalEdit = document.querySelector('.popup_type_edit');
const modalAdd = document.querySelector('.popup_type_new-card');
const modalImage = document.querySelector('.popup_type_image');
const modalCardImage = document.querySelector('.popup__image');
const modalCardTitle = document.querySelector('.popup__caption');
const modalAvatar = document.querySelector('.popup_type_edit-avatar');
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
  openModal(modalAvatar)
};

// Функция открытия модального окна изображения карточки
function openModalImage(card) {
  modalCardImage.src = card.link;
  modalCardImage.alt = card.name;
  modalCardTitle.textContent = card.name;
  openModal(modalImage);
};

// Функция изменения текста кнопки
function changeButtonText(form) {
  const modalButton = form.querySelector('.popup__button');
  if (modalButton.textContent === 'Сохранить') {
    modalButton.textContent = 'Сохранение...';
  } else {
    modalButton.textContent = 'Сохранить'
  }
};

// Функция удаления карточки
function deleteCard(cardId, card) {
  deleteCardId(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Функция лайка карточки
function likeCard(cardId, card) {
  if (card.classList.contains('card__like-button_is-active')) {
    unlikeCardId(cardId)
      .then((res) => {
        card.nextElementSibling.textContent = res.likes.length
        card.classList.toggle('card__like-button_is-active');
  })
  } else {
    likeCardId(cardId)
      .then((res) => {
        card.nextElementSibling.textContent = res.likes.length
        card.classList.toggle('card__like-button_is-active');
      })
  }
};

// Слушатели отправки форм
editFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

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
      closeModal(modalEdit);
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
      const serverCardElement = createCard(serverCardData, serverCardData.owner, deleteCard, likeCard, openModalImage);
      cardsContainer.prepend(serverCardElement);
      closeModal(modalAdd);
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
      console.error('Ошбика при отправке формы:', err);
    })
    .finally(() => {
      changeButtonText(avatarFormElement);
    })
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
    console.log(err);
  });

// Вывод карточек на страницу
function renderCard(card, user) {
  cardsContainer.append(createCard(card, user, deleteCard, likeCard, openModalImage));
};
