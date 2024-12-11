const popups = Array.from(document.querySelectorAll('.popup'));
function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);      
    } 
}
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
  }

popups.forEach(popup => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

