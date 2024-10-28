// @todo: Темплейт карточки
const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(content, deleteCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = content.name;
  cardImage.src = content.link;
  cardImage.alt = content.name;
  deleteButton.addEventListener('click', deleteCallback);
  return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  cardsContainer.append(createCard(card, deleteCard));
});

