
export function GetProfileInfo(profinfo, profabout, avatarx){
    return fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/users/me', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        authorization: '2effa810-351d-4784-87b9-8aa2623cb50b'
    }
    })
    .then(res => {
        if (res.ok){
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => {
        profinfo.textContent = res.name;
        profabout.textContent = res.about;
        avatarx.style.backgroundImage = `url(${res.avatar})`;
      }); 
}
export function GetCards(){
    return fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/cards', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        authorization: '2effa810-351d-4784-87b9-8aa2623cb50b'
    }
    })
    .then(res => {
        if (res.ok){
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => {
        return res;
      }); 
}
export function SetProfilInfo(profname,profabout){
    return fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/users/me', {
        method: 'PATCH',
        headers: {
          authorization: '2effa810-351d-4784-87b9-8aa2623cb50b',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: profname,
          about: profabout
        })
      })
    .then(res => {
      if (res.ok){
          return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })  
};
export function PostCard(cardname,cardlink){
    return fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/cards', {
        method: 'POST',
        headers: {
          authorization: '2effa810-351d-4784-87b9-8aa2623cb50b',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: cardname,
          link: cardlink
        })
      })
      .then((res) =>{
        return res.json();
      })
};
export function RemoveCard(cardId){
    return fetch(`https://nomoreparties.co/v1/frontend-st-cohort-201/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '2effa810-351d-4784-87b9-8aa2623cb50b',
            'Content-Type': 'application/json'
          }
    }); 
};

export function AddLike(cardId){
    return fetch(`https://nomoreparties.co/v1/frontend-st-cohort-201/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: '2effa810-351d-4784-87b9-8aa2623cb50b',
            'Content-Type': 'application/json'
          }
    })
    .then(res => {
      if (res.ok){
          return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }) 
};
export function DeleteLike(cardId){
    return fetch(`https://nomoreparties.co/v1/frontend-st-cohort-201/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '2effa810-351d-4784-87b9-8aa2623cb50b',
            'Content-Type': 'application/json'
          }
    })
    .then(res => {
      if (res.ok){
          return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }) 
};

export function PatchProfileAvatar(url){
  return fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '2effa810-351d-4784-87b9-8aa2623cb50b',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(res => {
    if (res.ok){
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}) 
};