// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./cards.js"
import "../pages/index.css"
import "./modal.js"
import "./valid.js"
import "./api.js"
import { closePopup } from "./modal.js"
import { cardTemplate } from "./cards.js"
import { placeList } from "./cards.js"
import {isValid} from './valid.js'
import { toggleButtonState } from "./valid.js"
import { popupCloseImage } from "./cards.js"
import { popupImage } from "./cards.js"
import { popupCaption } from "./cards.js"
import { imagePopup } from "./cards.js"
import {GetProfileInfo} from "./api.js"
import { SetProfilInfo } from "./api.js"
import { PostCard } from "./api.js"
import { RemoveCard } from "./api.js"
import { AddLike } from "./api.js"
import { DeleteLike } from "./api.js"
import { initialCards } from "./cards.js"
import { PatchProfileAvatar } from "./api.js"


GetProfileInfo(document.querySelector('.profile__title'), document.querySelector('.profile__description'), document.querySelector('.profile__image'));
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');

function closeByEsc(evt) {
  if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_is-opened');
      closePopup(openedPopup);      
  } 
}
export function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc); // Устанавливаем слушатель
}
export function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc); // Удаляем слушатель
}
const newlogo = document.querySelector('.popup_type_newlogo')
const profileEditLogoButton = document.querySelector('.image-container'); //Добавление аватара
const EditAvatarFormElement = document.querySelector('.popup__form_edit_avatar');
const popupCloseAvatar = newlogo.querySelector('.popup__close')
popupCloseAvatar.addEventListener("click",function() {
    closeModal(newlogo);
});
profileEditLogoButton.addEventListener("click",function() {
    openModal(newlogo);
});
function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    EditAvatarFormElement.querySelector('.popup__button').textContent = "Сохранение..."
    PatchProfileAvatar(document.querySelector('.popup__input_avatar').value)
    .then((res) => {
        document.querySelector('.profile__image').style.backgroundImage = `url(${document.querySelector('.popup__input_avatar').value})`
        closeModal(newlogo);
      })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        EditAvatarFormElement.querySelector('.popup__button').textContent = "Сохранить"
    })
}
EditAvatarFormElement.addEventListener('submit', handleAvatarFormSubmit); 

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener("click", function () {
    profilePopup.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;
    profilePopup.querySelector('.popup__input_type_description').value = document.querySelector('.profile__description').textContent;
    isValid(profilePopup, profilePopup.querySelector('.popup__input_type_name'));
    isValid(profilePopup, profilePopup.querySelector('.popup__input_type_description'));
    const inputListEdit = Array.from(profilePopup.querySelectorAll('.popup__input'));
    toggleButtonState(inputListEdit, profilePopup.querySelector('.popup__button'))
    openModal(profilePopup);
});
const profilepopupClose = profilePopup.querySelector('.popup__close');
profilepopupClose.addEventListener("click", () => closeModal(profilePopup));
const profileFormElement = document.querySelector('.popup__form_edit-profile')
export const formInput = profileFormElement.querySelector('.popup__input');
export const formError = profileFormElement.querySelector(`.${formInput.id}-error`);
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileFormElement.querySelector('.popup__button').textContent = "Сохранение..."
    SetProfilInfo(profilePopup.querySelector('.popup__input_type_name').value, profilePopup.querySelector('.popup__input_type_description').value)
    .then(()=>{
        document.querySelector('.profile__title').textContent = profilePopup.querySelector('.popup__input_type_name').value;
        document.querySelector('.profile__description').textContent = profilePopup.querySelector('.popup__input_type_description').value
        closeModal(profilePopup)
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        profileFormElement.querySelector('.popup__button').textContent = "Сохранить"
    });
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit); 


const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener("click",function() {
    openModal(cardPopup);
});
const popupCloseCard = cardPopup.querySelector('.popup__close')
popupCloseCard.addEventListener("click",function() {
    closeModal(cardPopup);
});


const CardFormElement = cardPopup.querySelector('.popup__form')
const nameCardInput = CardFormElement.querySelector('.popup__input_type_card-name')
const urlCardInput = CardFormElement.querySelector('.popup__input_type_url')
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardClone = cardTemplate.content.cloneNode(true);
    const cardItem = cardClone.querySelector('.places__item')
    const cardImage = cardItem.querySelector('.card__image');
    cardItem.querySelector('.card__title').textContent = nameCardInput.value;
    cardItem.querySelector('.card__image').src = urlCardInput.value;
    cardPopup.querySelector('.popup__button').textContent = "Сохранение..."
    PostCard(nameCardInput.value, urlCardInput.value)
    .then((res)=>{
        const like = cardItem.querySelector('.card__like-button');
        cardItem.querySelector('.likes__counter').textContent = res.likes.length;
        const cardDeleteButton = cardItem.querySelector('.card__delete-button');
        like.addEventListener('click',() => {
            if (like.classList.contains('card__like-button_is-active')){
                DeleteLike(res._id)
                .then((res)=>{
                    like.classList.remove('card__like-button_is-active');
                    cardItem.querySelector('.likes__counter').textContent = res.likes.length;
                  })
                  .catch((err) => {
                    console.log(err)
                  })
            }
            else{
                AddLike(res._id)
                .then((res)=>{
                    like.classList.add('card__like-button_is-active');
                    cardItem.querySelector('.likes__counter').textContent = res.likes.length;
                  })
                  .catch((err) => {
                    console.log(err)
                  })
            }
            cardItem.querySelector('.likes__counter').textContent = res.likes.length;
        });
        cardDeleteButton.addEventListener('click', () => {
        RemoveCard(res._id);
        cardItem.remove();
        });
        cardImage.addEventListener('click', function() {
            popupImage.src = urlCardInput.value;
            popupImage.alt = nameCardInput.value
            popupCaption.textContent = nameCardInput.value;
            openModal(imagePopup);
        });
        popupCloseImage.addEventListener('click', () => {
        closeModal(imagePopup);
        });
        placeList.append(cardClone)
        closeModal(cardPopup);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        cardPopup.querySelector('.popup__button').textContent = "Сохранить"
    });
}
CardFormElement.addEventListener('submit', handleCardFormSubmit);








