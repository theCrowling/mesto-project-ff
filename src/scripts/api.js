// Тут описаны функции для взаимодействия с сервером

// ответ сервера всегда проверяется на корректность проверкой res.ok;
// действия с DOM-элементами на странице производятся только после завершения запроса;
// в конце цепочки обработки каждого промиса обращения к серверу есть обработка ошибок;
// базовый адрес сервера и ключ авторизации вынесены отдельно и переиспользуются;

// Моя конфигурация
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-28',
  headers: {
    authorization: '0534fa74-5ff8-42fb-b57c-ea4a34c93f29',
    'Content-Type': 'application/json'
  }
}

// Функция обработки ответа сервера
function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка ответа: ${res.status}`);
  }
  return res.json();
};

// Функция получения данных пользователя с сервера
function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(handleResponse)
    .catch((err) => {
      console.log(err);
    });
};

// Функция получения карточек с сервера
function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(handleResponse)
    .catch((err) => {
      console.log(err);
    });
};

// Функция отправки данных пользователя на сервер
function sendUserData(userData) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userData.name,
      about: userData.about
    })
  })
    .then(handleResponse)
    .catch((err) => {
      console.log(err);
    });
};

// Функция отправки новой карточки на сервер
function addNewCard(cardData) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(cardData)
  })
    .then(handleResponse)
    .catch((err) => {
      console.log(err);
    });
};

// Функция удаления карточки с сервера
function deleteCardId(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(handleResponse)
    .catch((err) => {
      console.log(err);
    });
};

// Функция лайка карточки
function likeCardId(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(handleResponse)
    .catch((err) => {
      console.log(err);
    });
};

// Функция удаления лайка с карточки
function unlikeCardId(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(handleResponse)
    .catch((err) => {
      console.log(err);
    });
};

// Функция изменения аватара пользователя
function changeAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
    .then(handleResponse)
    .catch((err) => {
      console.log(err);
    });
};

export {
  getUserData,
  getCards,
  sendUserData,
  addNewCard,
  deleteCardId,
  likeCardId,
  unlikeCardId,
  changeAvatar,
};
