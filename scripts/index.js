// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу



const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}
function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener("click", function () {
    profilePopup.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent
    profilePopup.querySelector('.popup__input_type_description').value = document.querySelector('.profile__description').textContent
    openModal(profilePopup);
});
const profilepopupClose = profilePopup.querySelector('.popup__close');
profilepopupClose.addEventListener("click", () => closeModal(profilePopup));

const profileFormElement = document.querySelector('.popup__form')
const nameInput = profileFormElement.querySelector('.popup__input_type_name')
const jobInput = profileFormElement.querySelector('.popup__input_type_description')
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = profilePopup.querySelector('.popup__input_type_name').value;
    document.querySelector('.profile__description').textContent = profilePopup.querySelector('.popup__input_type_description').value
    closeModal(profilePopup);
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit); 


const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener("click",function() {
    openModal(cardPopup);
});
popupCloseCard = cardPopup.querySelector('.popup__close')
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
    cardItem.querySelector('.card__title').textContent = nameCardInput.value;
    cardItem.querySelector('.card__image').src = urlCardInput.value;
    placeList.append(cardClone)
    closeModal(cardPopup);
}
CardFormElement.addEventListener('submit', handleCardFormSubmit);


const like = cardItem.querySelector('.card__like-button');
like.addEventListener('click',function() {      
    like.classList.toggle('card__like-button_is-active');
});