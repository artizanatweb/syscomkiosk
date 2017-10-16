window.$ = window.jQuery = window.jquery = require("jquery");
const buttonEvents = require('./ButtonEvents');
let ImageFile = require('./ImageFile');


class WebCamera
{
    constructor() {
        if (!($('#liveVideo').length > 0)) {
            return;
        }

        this.canvas = document.getElementById('photo-canvas');
        this.image = document.getElementById('cam-photo');

        this.bindShotEvent();
    }

    takePhoto() {
        ImageFile.imageData = '';

        var context = this.canvas.getContext('2d');

        var width = $('#liveVideo').width();
        var height = $('#liveVideo').height();
        
        this.canvas.width = width;
        this.canvas.height = height;
        context.drawImage(document.getElementById('liveVideo'), 0, 0, width, height);
    
        ImageFile.imageData = this.canvas.toDataURL('image/png');
        this.image.setAttribute('src', ImageFile.imageData);

        buttonEvents.emit('change-page', 'third');
    }

    bindShotEvent() {
        let self = this;

        buttonEvents.on('take-shot', function() {
            self.takePhoto();
        });
    }
}

module.exports = WebCamera;