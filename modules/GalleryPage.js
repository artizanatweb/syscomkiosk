window.$ = window.jQuery = window.jquery = require("jquery");
const ko = knockout = require('knockout');
const Page = require('./Page');
const Button = require('./Button');


class GalleryPage extends Page
{
    constructor(pageIdStr) {
        super('gallery');

        if (!($('#' + pageIdStr).length > 0)) {
            return;
        }

        super.initKo(pageIdStr);

        this.createButtons();
    }

    createButtons() {
        this.buttons = [
            new Button('backToHomeGallery', 'change-page', 'home')
        ];
    }
}

module.exports = GalleryPage;