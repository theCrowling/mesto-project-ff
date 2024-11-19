const initialCards = [
    {
      name: "Винтерфелл",
      link: "https://www.kino-teatr.ru/news/9566/94687.jpg",
    },
    {
      name: "Черный замок",
      link: "https://www.syfy.com/sites/syfy/files/2019/04/game_of_thrones_castle_black_via_hbo_site_2019.jpg",
    },
    {
      name: "Стена",
      link: "https://www.focus.it/site_stored/imgs/0005/012/game-of-thrones-the-wall-history-03.jpg",
    },
    {
      name: "Суровый дом",
      link: "https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/26606632-8c81-42ba-9487-b20d1fa12298/1920x",
    },
    {
      name: "Драконий камень",
      link: "https://i.pinimg.com/originals/49/24/08/492408222398b56f0bda84f9388f1473.jpg",
    },
    {
      name: "Королевская гавань",
      link: "https://avatars.mds.yandex.net/i?id=8edfc87ebca79b060b9c91ce691502b0_l-5465325-images-thumbs&n=13",
    }
];

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

export { initialCards, createCard, deleteCard, likeCard };
