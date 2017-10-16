const ko = knockout = require('knockout');
const pageEvents = require('./PageEvents');

class Page
{
    constructor(pageName) {
        this.name = pageName;
        this.isVisible = ko.observable(false);
        this.bindPageEvents();
    }

    initKo(pageIdStr) {
        let self = this;
        ko.applyBindings(self, document.getElementById(pageIdStr));
    }

    show() {
        this.isVisible(true);
    }

    hide() {
        this.isVisible(false);
    }

    bindPageEvents() {
        let self = this;
        pageEvents.on('visibility', function(pageName, action) {
            if (pageName != self.name && pageName != 'all') {
                return;
            }

            if (action === 'show') {
                self.show();
                return;
            }

            if (action === 'hide') {
                self.hide();
                return;
            }
        });
    }
}

module.exports = Page;