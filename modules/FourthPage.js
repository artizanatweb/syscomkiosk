window.$ = window.jQuery = window.jquery = require("jquery");
const ko = knockout = require('knockout');
const Page = require('./Page');
const buttonEvents = require('./ButtonEvents');
const Button = require('./Button');
const EmailButton = require('./EmailButton');


class FourthPage extends Page
{
    constructor(pageIdStr) {
        super('fourth');

        if (!($('#' + pageIdStr).length > 0)) {
            return;
        }

        this.emailAddress = ko.observable('');

        super.initKo(pageIdStr);

        this.createButtons();

        this.bindChangePage();
    }

    createButtons() {
        let self = this;

        this.buttons = [
            new Button('backToHomeFour', 'change-page', 'home'),
            new EmailButton('sendEmail', 'send-email', self.emailAddress)
        ];
    }

    bindChangePage() {
        let self = this;

        buttonEvents.on('change-page', function(page) {
            if (page === self.name) {
                self.emailAddress('');
            }
        });
    }
}

module.exports = FourthPage;