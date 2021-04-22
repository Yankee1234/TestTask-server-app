class MessageHelper {
    getServerError() {
        return 'ServerError';
    }

    getExistsError() {
        return 'ItemExists';
    }

    getIncorrectLoginOrPasswordMessage() {
        return 'IncorrectLoginOrPassword';
    }

    getSuccessfulInsertingMessage() {
        return 'SuccessfulInserting';
    }

    getUnloginnedUserMessage() {
        return 'Unloginned';
    }

    getEmptyProfileMessage(){
        return 'EmptyProfile';
    }

    getFindingMessage() {
        return 'HasFound';
    }

    getUpdateMessage() {
        return 'Updated';
    }

    getNotFoundMessage(){
        return 'NotFound';
    }

}

module.exports = new MessageHelper();