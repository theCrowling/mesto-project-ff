//Тут описаны функции для работы с модальными окнами: функция открытия модального окна, функция закрытия модального окна, функция-обработчик события нажатия Esc и функция-обработчик события клика по оверлею;

// Функция открытия модального окна
function openModal(nameModal) {
  nameModal.classList.add('popup_is-opened');
  document.addEventListener('keydown', escHandler);
  document.addEventListener('click', clickHandler);
};

// Функция закрытия модального окна
function closeModal(nameModal) {
  nameModal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escHandler);
  document.removeEventListener('click', clickHandler);
};

// Функция-обработчик события нажатия Esc
function escHandler(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal);
  }
};

// Функция-обработчик события клика
function clickHandler(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal);
  }
};

export { openModal, closeModal, escHandler };
