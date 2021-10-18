const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Нургуш',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
    },
    {
        name: 'Тулиновка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
    },
    {
        name: 'Остров Желтухина',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
    },
    {
        name: 'Владивосток',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
    }
];

const placesList = document.querySelector('.places-list');
const placeCards = document.querySelectorAll('.place-card');
const userInfoButton = document.querySelector('.user-info__button');
const popupClose = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
// const form = document.querySelector('.popup__form');
const form = document.forms.new;

function collectCard(name, link) {
    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card');

    const placeCardImage = document.createElement('div');
    placeCardImage.classList.add('place-card__image');

    const placeCardDeleteButton = document.createElement('button');
    placeCardDeleteButton.classList.add('place-card__delete-icon');

    const placeCardDescription = document.createElement('div');
    placeCardDescription.classList.add('place-card__description');

    const placeCardName = document.createElement('h3');
    placeCardName.classList.add('place-card__name');

    const placeCardLike = document.createElement('button');
    placeCardLike.classList.add('place-card__like-icon');
    // placeCardLike.addEventListener("click", () => {
    //     console.log("+")
    //     placeCardLike.classList.toggle('place-card__like-icon_liked');
    // });

    placeCard.appendChild(placeCardImage);
    placeCardImage.appendChild(placeCardDeleteButton);
    placeCard.appendChild(placeCardDescription);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLike);

    placeCardImage.style = `background-image: url(${link})`;
    placeCardName.textContent = name;

    return placeCard;
}

function pushCard(name, link) {
    placesList.appendChild(collectCard(name, link));
}

function loadCards() {
    initialCards.forEach((e) => {
        pushCard(e.name, e.link)
    });
}

function openModal() {
    popup.classList.add('popup_is-opened');
}

function closeModal() {
    popup.classList.remove('popup_is-opened');
}

// const cardLikeIcons = document.querySelectorAll('.place-card__like-icon');
// cardLikeIcons.forEach((e) => {
//     e.addEventListener("click", () => {
//         console.log("+")
//         e.classList.toggle('place-card__like-icon_liked');
//     });
// });
//? подсмотрел решение у тебя, считаю тожене совсем правильным, но более компактным 
function like(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }
}

function delCard(event) {
    if (event.target.classList.contains('place-card__delete-icon')) {
        event.target.closest('.place-card').outerHTML = '';
    }
}

function checkInput() {
    const name = form.elements.name.value;
    const link = form.elements.link.value;
    const popupButton = document.querySelector('.popup__button')
    if (name != 0 && link != 0) {
        popupButton.classList.add('popup__button--black')
    } else {
        popupButton.classList.remove('popup__button--black')
    }
}

function addNewCard(event) {
    event.preventDefault();
    const name = form.elements.name.value;
    const link = form.elements.link.value;
    const nameform = document.querySelector('.popup__input_type_name');
    const linkForm = document.querySelector('.popup__input_type_link-url');
    if (name != 0 || link != 0) {
        // console.log(nameform.value);
        // console.log(linkForm.value);
        pushCard(name, link);
        closeModal();
        nameform.value = '';
        linkForm.value = '';
    }
}

form.addEventListener('input', checkInput);

form.addEventListener('submit', addNewCard);

placesList.addEventListener('click', like);

placesList.addEventListener('click', delCard);

userInfoButton.addEventListener("click", openModal);

popupClose.addEventListener("click", closeModal);

loadCards();