class Profile {
    userLogin;
    name;
    surname;
    birthday;

    constructor(userLogin, name, surname, birthday) {
        this.userLogin = userLogin;
        this.name = name;
        this.surname = surname;
        this.birthday = birthday;
    }
}

module.exports = Profile;