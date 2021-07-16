export class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    _handleResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
        .then(this._handleResponse)
    }
    
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
        .then(this._handleResponse)
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
        .then(this._handleResponse)
    }

    deleteCard(cardElement) {
        return fetch(`${this.baseUrl}/cards/${cardElement._id}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this._handleResponse)
    }

    setLike(cardElement) {
        return fetch(`${this.baseUrl}/cards/likes/${cardElement._id}`,{
            method: 'PUT',
            headers: this.headers
        })
        .then(this._handleResponse)
    }

    deleteLike(cardElement) {
        return fetch(`${this.baseUrl}/cards/likes/${cardElement._id}`,{
            method: 'DELETE',
            headers: this.headers
        })
        .then(this._handleResponse)
    }

    changeAvatar(input) {
        return fetch(`${this.baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: input.link
            })
        })
        .then(this._handleResponse)
    }
}