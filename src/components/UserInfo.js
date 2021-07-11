class UserInfo{
    constructor({name, about}) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
    }

    getUserInfo() {
        this._userData = {
            name: this._name,
            about: this._about
        }
        return this._userData;
    }

    setUserInfo(inputValues) {
        this._name.textContent = inputValues.name;
        this._about.textContent = inputValues.about;
    }
}

export default UserInfo