const buttonEvents = require('./ButtonEvents');

class Button
{
    constructor(strElemId, action, pageName) {
        $('#' + strElemId).on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            buttonEvents.emit(action, pageName);

            return false;
        });
    }
}

module.exports = Button;