export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameEl = document.querySelector(nameSelector);
        this._jobEl = document.querySelector(jobSelector);
    }

    // Method to get current user info
    getUserInfo() {
        return {
            name: this._nameEl.textContent,
            job: this._jobEl.textContent,
        };
    }

    // Method to set user info after form submission
    setUserInfo({ name, job }) {
        this._nameEl.textContent = name;
        this._jobEl.textContent = job;
    }
}