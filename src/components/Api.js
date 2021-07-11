export class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    updateUserInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .catch(err => console.log('Ошибка', err)
        );
    }

    loadNewCard(cardElement) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: cardElement.name,
                link: cardElement.link
            })
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteCard(cardElement) {
        return fetch(`${this.baseUrl}/cards/${cardElement._id}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    setLike(cardElement) {
        return fetch(`${this.baseUrl}/cards/likes/${cardElement._id}`,{
            method: 'PUT',
            headers: this.headers
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteLike(cardElement) {
        return fetch(`${this.baseUrl}/cards/likes/${cardElement._id}`,{
            method: 'DELETE',
            headers: this.headers
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}