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
const cardTemplate = document.querySelector('#card-template');
const placeList = document.querySelector('.places__list');

const imagePopup = document.querySelector('.popup_type_image'); 
const popupImage = imagePopup.querySelector('.popup__image'); 
const popupCaption = imagePopup.querySelector('.popup__caption'); 
const popupCloseImage = imagePopup.querySelector('.popup__close');


initialCards.forEach(function createCard(element){
  const cardClone = cardTemplate.content.cloneNode(true);
  const cardItem = cardClone.querySelector('.places__item');
  const cardImage = cardItem.querySelector('.card__image');
  const like = cardItem.querySelector('.card__like-button');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  cardItem.querySelector('.card__title').textContent = element.name;
  cardItem.querySelector('.card__image').src = element.link;
  like.addEventListener('click',() => {    
    like.classList.toggle('card__like-button_is-active');
});
cardDeleteButton.addEventListener('click', () => {
  cardItem.remove();
});
cardImage.addEventListener('click', function() {
  popupImage.src = element.link;
  popupImage.alt = element.name 
  popupCaption.textContent = element.name;
  openModal(imagePopup);
});
popupCloseImage.addEventListener('click', () => {
  closeModal(imagePopup);
});
  placeList.append(cardClone)
})
