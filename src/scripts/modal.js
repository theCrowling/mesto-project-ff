//Тут описаны функции для работы с модальными окнами: функция открытия модального окна, функция закрытия модального окна, функция-обработчик события нажатия Esc и функция-обработчик события клика по оверлею;

// Функция открытия модального окна
function openModal(nameModal) {
  nameModal.classList.add('popup_is-opened');
  document.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
};

// Функция закрытия модального окна
function closeModal(evt) {
  const openedModal = document.querySelector('.popup_is-opened');
  if (!openedModal) return;

  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup') || evt.key === 'Escape') {
    openedModal.classList.remove('popup_is-opened');
    document.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeModal);
  };
};

export { openModal, closeModal };
