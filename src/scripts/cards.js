const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

//Тут описаны функции для работы с карточками: функция создания карточки, функции-обработчики событий удаления и лайка карточки;

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard(content, deleteCallback, modalCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = content.name;
  cardImage.src = content.link;
  cardImage.alt = content.name;
  deleteButton.addEventListener('click', deleteCallback);
  cardImage.addEventListener('click', () => modalCallback(content));
  return cardElement;
};

// Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

// Функция лайка карточки будет тут
// function likeCard(evt) {
//   evt.target.classList.toggle('card__like-button_active');
// };

export { initialCards, createCard, deleteCard };
