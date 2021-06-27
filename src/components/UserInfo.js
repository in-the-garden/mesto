class UserInfo{
    constructor({name, job}) {
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
    }

    getUserInfo() {
        this._userData = {
            name: this._name.textContent,
            job: this._job.textContent
        }
        return this._userData;
    }

    setUserInfo(inputValues) {
        this._name.textContent = inputValues.name;
        this._job.textContent = inputValues.job;
    }
}

export default UserInfo