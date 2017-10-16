window.$ = window.jQuery = window.jquery = require("jquery");
const ko = knockout = require('knockout');
const Page = require('./Page');
const buttonEvents = require('./ButtonEvents');
const Button = require('./Button');


class FifthPage extends Page
{
    constructor(pageIdStr) {
        super('fifth');

        if (!($('#' + pageIdStr).length > 0)) {
            return;
        }

        super.initKo(pageIdStr);

        this.timer = 0;

        this.createButtons();

        let self = this;
        self.isVisible.subscribe(function (newValue) {
            if (newValue === true) {
                // redirect to home screen
                self.timer = setTimeout(function() {
                    buttonEvents.emit('change-page', 'home');
                }, 5000);
                return;
            }

            if (newValue === false) {
                clearTimeout(self.timer);
            }
        });
    }

    createButtons() {
        this.buttons = [
            new Button('backToHomeFive', 'change-page', 'home')
        ];
    }
}

module.exports = FifthPage;