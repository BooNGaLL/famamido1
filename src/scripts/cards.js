import {closeModal} from "./index.js"
import {openModal} from "./index.js"
import { GetCards } from "./api.js"
import { RemoveCard } from "./api.js";
import { AddLike } from "./api.js";
import { DeleteLike } from "./api.js";
export const initialCards = await GetCards();
export const cardTemplate = document.querySelector('#card-template');
export const placeList = document.querySelector('.places__list');

export const imagePopup = document.querySelector('.popup_type_image'); 
export const popupImage = imagePopup.querySelector('.popup__image'); 
export const popupCaption = imagePopup.querySelector('.popup__caption'); 
export const popupCloseImage = imagePopup.querySelector('.popup__close');


initialCards.forEach(function createCard(element){
  const cardClone = cardTemplate.content.cloneNode(true);
  const cardItem = cardClone.querySelector('.places__item');
  const cardImage = cardItem.querySelector('.card__image');
  const like = cardItem.querySelector('.card__like-button');
  cardItem.querySelector('.likes__counter').textContent = element.likes.length
  if (element.owner._id.includes("7e45e047addaeb6468eb64db")){
    const cardDeleteButton = cardItem.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => {
      RemoveCard(element._id);
      cardItem.remove();
    });
  }
  else{
    cardItem.querySelector('.card__delete-button').style.display = "none";
  }
  cardItem.querySelector('.card__title').textContent = element.name;
  cardItem.querySelector('.card__image').src = element.link;
  like.addEventListener('click',() => {
    if (like.classList.contains('card__like-button_is-active')){
        DeleteLike(element._id)
        .then((res)=>{
          like.classList.remove('card__like-button_is-active');
          cardItem.querySelector('.likes__counter').textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else{
        AddLike(element._id)
        .then((res)=>{
          like.classList.add('card__like-button_is-active');
          cardItem.querySelector('.likes__counter').textContent = res.likes.length;
        })
        .catch((err) => {
          console.log(err)
        })
    }
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
