import { deleteCardId, likeCardId, unlikeCardId } from "./api";

//Тут описаны функции для работы с карточками: функция создания карточки, функции-обработчики событий удаления и лайка карточки;

// Функция создания карточки
function createCard(content, user, deleteCallback, likeCallback, modalCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardElement.querySelector('.card__title').textContent = content.name;
  cardImage.src = content.link;
  cardImage.alt = content.name;
  likeCounter.textContent = content.likes.length;

  if (content.likes.some(like => like._id === user._id)) {
    likeButton.classList.add('card__like-button_is-active')
  }
  if (content.owner._id === user._id) {
    deleteButton.classList.remove('card__delete-button_hidden');
  }

  deleteButton.addEventListener('click', () => deleteCallback(content._id, cardElement));
  likeButton.addEventListener('click', () => likeCallback(content._id, likeButton, likeCounter));
  cardImage.addEventListener('click', () => modalCallback(content));
  return cardElement;
};

// Функция удаления карточки
function deleteCard(cardId, card) {
  deleteCardId(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.error('Ошбика при удалении карточки:', err);
    });
};

// Функция лайка карточки
function likeCard(cardId, cardElem, counter) {
  if (cardElem.classList.contains('card__like-button_is-active')) {
    unlikeCardId(cardId)
      .then((res) => {
        counter.textContent = res.likes.length
        cardElem.classList.toggle('card__like-button_is-active');
      })
      .catch((err) => {
        console.error('Ошбика при установке лайка:', err);
  })
  } else {
    likeCardId(cardId)
      .then((res) => {
        counter.textContent = res.likes.length
        cardElem.classList.toggle('card__like-button_is-active');
      })
      .catch((err) => {
        console.error('Ошбика при установке лайка:', err);
      });
  }
};

export { createCard, deleteCard, likeCard };
