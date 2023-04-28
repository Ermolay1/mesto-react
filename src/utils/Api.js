 class Api {
   /* constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;
      }
    
      _getHeaders() {
        return {
          authorization: this._token,
          "content-type": "application/json",
        };
      }
    
      _getJson(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    
      getCurrentUser() {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._getHeaders(),
        }).then(this._getJson);
      }
    
      getCards() {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._getHeaders(),
        }).then(this._getJson);
      }
    
      createNewUser(data) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: this._getHeaders(),
          body: JSON.stringify({
            name: data.name,
            about: data.about,
          }),
        }).then(this._getJson);
      }
    
      createNewAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: this._getHeaders(),
          body: JSON.stringify({
            avatar: data.link,
          }),
        }).then(this._getJson);
      }
    
      createNewCard(item) {
        return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._getHeaders(),
          body: JSON.stringify(item),
        }).then(this._getJson);
      }
    
      deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
          method: "DELETE",
          headers: this._getHeaders(),
        }).then(this._getJson);
      }
    
      likeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: "PUT",
          headers: this._getHeaders(),
        }).then(this._getJson);
      }
      unlikeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: "DELETE",
          headers: this._getHeaders(),
        }).then(this._getJson);
      }*/
      
    constructor(bathPath, token) {
      this._basePath = bathPath;
      this._token = token;
  }

  _getHeaders() {
      return {
          authorization: this._token,
          'Content-Type': 'application/json'
      }
  }

  _getJson(res) {
      if (res.ok) {
          return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
      return fetch(url, options).then(this._getJson);
  }

  getCards() {
      return this._request(`${this._basePath}/cards`, {
          headers: this._getHeaders()
      });
  }

  deleteCard(_id) {
      return fetch(`${this._url}/cards/${_id}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse)
  }

  getUserInfo() {
      return this._request(`${this._basePath}/users/me`, {
          headers: this._getHeaders()
      });
  }

  getAllCardWhithUser() {
      return Promise.all([this.getCards(), this.getUserInfo()]);
  }

  editUserInfo({ item }) {
      return this._request(`${this._basePath}/users/me`, {
          method: 'PATCH',
          headers: this._getHeaders(),
          body: JSON.stringify({
              name: item.name,
              about: item.about
          })
      });
  }

  addNewCard({ item }) {
      return this._request(`${this._basePath}/cards`, {
          method: "POST",
          headers: this._getHeaders(),
          body: JSON.stringify({
              link: item.link,
              name: item.name
          })
      });
  }

  _likeCard(id) {
      return this._request(`${this._basePath}/cards/${id}/likes`, {
          method: "PUT",
          headers: this._getHeaders(),
      });
  }

  _deleteLike(id) {
      return this._request(`${this._basePath}/cards/${id}/likes`, {
          method: "DELETE",
          headers: this._getHeaders(),
      });
  }

  changeLikeCardStatus(id, isLiked) {
      return isLiked ? this._deleteLike(id) : this._likeCard(id)
  }

  editAvatar({ item }) {
      return this._request(`${this._basePath}/users/me/avatar`, {
          method: "PATCH",
          headers: this._getHeaders(),
          body: JSON.stringify({ avatar: item.link })
      });
  }
  
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-61',
     '71ce217b-0d84-4894-b27b-2d906663c6db'); 
    
  export default api;