window.$ = window.jQuery = window.jquery = require("jquery");
window.Velocity = require('velocity-animate');

const pageEvents = require('./PageEvents');
const buttonEvents = require('./ButtonEvents');
const Page = require('./Page');

class PageManager
{
    constructor(pages) {
        this.element = $('#animation-container');
        this.pages = [];
        if (!(pages !== undefined && pages.length > 0)) {
            return;
        }

        this.pages = pages;
        
        // show first page
        let firstPage = this.pages[0];
        this.animateShow(firstPage);

        this.bindButtons();
    }

    animateShow(pageName) {
        let self = this;

        pageEvents.emit('visibility', pageName, 'show');
        $(self.element).velocity('slideDown', 500, function() {
            //
        });
    }

    animateHide(callback) {
        let self = this;
        
        $(self.element).velocity('slideUp', 500, function() {
            pageEvents.emit('visibility', 'all', 'hide');
            if (callback != undefined) {
                callback();
            }
        });
    }

    bindButtons() {
        let self = this;

        buttonEvents.on('change-page', function(pageName) {
            self.animateHide(function() {
                self.animateShow(pageName);
            });
        });
    }
}

module.exports = PageManager;