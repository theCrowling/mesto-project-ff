// Импорт функций
import { deleteCardId, likeCardId, unlikeCardId } from "./api";

//Тут описаны функции для работы с карточками: функция создания карточки, функции-обработчики событий удаления и лайка карточки;

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(content, user, deleteCallback, likeCallback, modalCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardElement.querySelector('.card__title').textContent = content.name;
  cardImage.src = content.link;
  cardImage.alt = content.name;
  cardElement.dataset.id = content._id;
  likeCounter.textContent = content.likes.length;

  if (content.likes.some(like => like._id === user._id)) {
    likeButton.classList.add('card__like-button_is-active')
  }
  if (content.owner._id === user._id) {
    deleteButton.classList.remove('card__delete-button_hidden');
  }

  deleteButton.addEventListener('click', deleteCallback);
  likeButton.addEventListener('click', likeCallback);
  cardImage.addEventListener('click', () => modalCallback(content));
  return cardElement;
};

// Функция удаления карточки
function deleteCard(evt) {
  const closestCard = evt.target.closest('.card');
  deleteCardId(closestCard.dataset.id);
  closestCard.remove();
};

// Функция лайка карточки
function likeCard(evt) {
  const target = evt.target;
  if (target.classList.contains('card__like-button')) {
    target.classList.toggle('card__like-button_is-active');
    // Изменение счетчика лайков
    if (target.classList.contains('card__like-button_is-active')) {
      likeCardId(target.closest('.card').dataset.id)
        .then((res) => target.nextElementSibling.textContent = res.likes.length)
    } else {
      unlikeCardId(target.closest('.card').dataset.id)
        .then((res) => target.nextElementSibling.textContent = res.likes.length)
    }
  };
};

export { createCard, deleteCard, likeCard };
