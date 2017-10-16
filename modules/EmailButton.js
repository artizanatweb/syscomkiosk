const buttonEvents = require('./ButtonEvents');
const validator = require('validator');

class EmailButton
{
    constructor(strElemId, action, callbackAttribute) {
        $('#' + strElemId).on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            let emailAddress = callbackAttribute();
            if (!validator.isEmail(emailAddress)) {
                return false;
            }

            buttonEvents.emit(action, emailAddress);

            return false;
        });
    }
}

module.exports = EmailButton;