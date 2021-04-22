class User {
    login;
    email;
    password;

    constructor(login, email, password) {
        this.login = login;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;