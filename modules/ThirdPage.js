window.$ = window.jQuery = window.jquery = require("jquery");
const ko = knockout = require('knockout');
const Page = require('./Page');
const buttonEvents = require('./ButtonEvents');
const Button = require('./Button');
let ImageFile = require('./ImageFile');


class ThirdPage extends Page
{
    constructor(pageIdStr) {
        super('third');

        if (!($('#' + pageIdStr).length > 0)) {
            return;
        }

        ImageFile.imageData = '';

        super.initKo(pageIdStr);

        this.createButtons();
    }

    createButtons() {
        this.buttons = [
            new Button('backToHome', 'change-page', 'home'),
            new Button('sendPhoto', 'change-page', 'fourth'),
            new Button('backToSecond', 'change-page', 'second')
        ];
    }
}

module.exports = ThirdPage;