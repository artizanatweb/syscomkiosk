window.$ = window.jQuery = window.jquery = require("jquery");
const ko = knockout = require('knockout');
const Page = require('./Page');
const buttonEvents = require('./ButtonEvents');


class SecondPage extends Page
{
    constructor(pageIdStr) {
        super('second');

        if (!($('#' + pageIdStr).length > 0)) {
            return;
        }

        this.maxCounter = 3;
        this.counter = ko.observable(this.maxCounter);

        super.initKo(pageIdStr);

        let self = this;
        self.isVisible.subscribe(function (newValue) {
            if (newValue === true) {
                // show camera feed
                self.openCamera();
            }
        });
    }

    openCamera() {
        if (!this.hasGetUserMedia()) {
            console.log('Media not suported');
            return;
        }

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        navigator.getUserMedia({ audio: false, video: { width: 800, height: 600 } }, this.handleVideo, this.videoError);

        this.startCountdown();
    }

    hasGetUserMedia() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
    }

    handleVideo(stream) {
        SecondPage.stream = stream;
        var video = document.getElementById('liveVideo');
        video.src = window.URL.createObjectURL(stream);
    }

    videoError(error) {
        console.log(error);
    }

    startCountdown() {
        var self = this;

        self.counter(self.maxCounter);
        var countDown = function() {
            if (self.counter() == 0) {
                // take picture
                buttonEvents.emit('take-shot', '', '');
                
                if (typeof SecondPage.stream != 'undefined') {
                    var track = SecondPage.stream.getTracks()[0];
                    track.stop();
                }

                // exit
                return;
            }

            setTimeout(function() {
                self.counter(self.counter() - 1);
                countDown();
            }, 1000);
        };

        countDown();
    }
}

module.exports = SecondPage;