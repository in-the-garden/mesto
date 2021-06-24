class UserInfo{
    constructor(nameSelector, jobSelector) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    }

    getUserInfo() {
        const popupEdit = document.querySelector('.popup_form_profile');
        const nameInput = popupEdit.querySelector('.popup__input_info_name');
        const jobInput = popupEdit.querySelector('.popup__input_info_job');
        
        nameInput.value = this._name.textContent;
        jobInput.value = this._job.textContent
    }

    setUserInfo(inputValues) {
        this._name.textContent = inputValues.name;
        this._job.textContent = inputValues.job;
    }
}

export default UserInfo