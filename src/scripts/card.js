//Тут описаны функции для работы с карточками: функция создания карточки, функции-обработчики событий удаления и лайка карточки;

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(content, deleteCallback, likeCallback, modalCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardElement.querySelector('.card__title').textContent = content.name;
  cardImage.src = content.link;
  cardImage.alt = content.name;
  deleteButton.addEventListener('click', deleteCallback);
  likeButton.addEventListener('click', likeCallback);
  cardImage.addEventListener('click', () => modalCallback(content));
  return cardElement;
};

// Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

// Функция лайка карточки
function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
};

export { createCard, deleteCard, likeCard };
