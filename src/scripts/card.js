//Тут описаны функции для работы с карточками: функция создания карточки, функции удаления и лайка карточки;


// Функция создания карточки
function createCard(content, user, likeCallback, modalImageCallback, modalDeleteCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  isImageValid(content.link)
  .then((isValid) => {
    if (isValid) { // Устанавливаем данные карточки, если ссылка валидна
      cardElement.querySelector('.card__title').textContent = content.name;
      cardImage.src = content.link;
      cardImage.alt = content.name;
      likeCounter.textContent = content.likes.length;

      if (content.likes.some(like => like._id === user._id)) {
        likeButton.classList.add('card__like-button_is-active')
      }

      likeButton.addEventListener('click', () => likeCallback(content._id, likeButton, likeCounter));
      cardImage.addEventListener('click', () => modalImageCallback(content));
    } else { // Если ссылка не валидна
      cardElement.querySelector('.card__title').textContent = 'Не найдено';
      cardImage.src = '';
      cardImage.alt = '';
      likeButton.style.display = 'none';
      likeCounter.textContent = ' ';
    }
  })
  .catch((err) => {
    console.error('Ошибка проверки изображения:', err);
  });

  if (content.owner._id === user._id) {
    deleteButton.classList.remove('card__delete-button_hidden');
    deleteButton.addEventListener('click', () => modalDeleteCallback(content._id, cardElement));
  }

  return cardElement;
};

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
};

// Функция лайка карточки
function likeCard(cardElement) {
  cardElement.classList.toggle('card__like-button_is-active');
};

// Функция проверки ссылки на валидность
function isImageValid(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);  // Рабочая ссылка
    img.onerror = () => resolve(false); // Нерабочая ссылка
    img.src = url;
  });
}

export { createCard, deleteCard, likeCard };
