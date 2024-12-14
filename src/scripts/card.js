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
  likeCounter.textContent = content.likes.length;

  if (content.likes.some(like => like._id === user._id)) {
    likeButton.classList.add('card__like-button_is-active')
  }
  if (content.owner._id === user._id) {
    deleteButton.classList.remove('card__delete-button_hidden');
  }

  deleteButton.addEventListener('click', () => deleteCallback(content._id, cardElement));
  likeButton.addEventListener('click', () => likeCallback(content._id, likeButton));
  cardImage.addEventListener('click', () => modalCallback(content));
  return cardElement;
};

export { createCard };
