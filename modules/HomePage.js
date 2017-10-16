window.$ = window.jQuery = window.jquery = require("jquery");
const ko = knockout = require('knockout');
const Page = require('./Page');
const buttonEvents = require('./ButtonEvents');
const Button = require('./Button');


class HomePage extends Page
{
    constructor(pageIdStr) {
        super('home');

        if (!($('#' + pageIdStr).length > 0)) {
            return;
        }

        super.initKo(pageIdStr);

        this.createButtons();
    }

    createButtons() {
        this.buttons = [
            new Button('startPoza', 'change-page', 'second'),
            new Button('showGallery', 'change-page', 'gallery')
        ];
    }
}

module.exports = HomePage;