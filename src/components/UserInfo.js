class UserInfo{
    constructor({name, about, avatar}) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        this._userData = {
            name: this._name,
            about: this._about,
            avatar: this._avatar
        }
        return this._userData;
    }

    setUserInfo(inputValues) {
        this._name.textContent = inputValues.name;
        this._about.textContent = inputValues.about;
    }

    setAvatar(inputValue) {
        this._avatar.src = inputValue.avatar;
    }
}

export default UserInfo