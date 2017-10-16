const electron = require('electron');
const buttonEvents = require('./ButtonEvents');
const fs = require('fs');

class ImageFile
{
    constructor() {
        this.imageData = '';

        this.bindSave();
    }

    save(emailString) {
        if (!(this.imageData.length > 1)) {
            return;
        }

        if (!(emailString.length > 1)) {
            return;
        }


        let time = Math.floor(new Date() / 1000);
        let base64Data = this.imageData.replace(/^data:image\/png;base64,/, "");
        
        emailString = emailString.replace('@','_');

        let fileName = emailString + '.' + new String(time);

        try {
            fs.writeFileSync(__dirname + "/../photos/" + fileName + ".png", base64Data, 'base64');
        } catch(err) {
            console.log(err);
        }

        buttonEvents.emit('change-page', 'fifth');
    }

    bindSave() {
        var self = this;

        buttonEvents.on('send-email', function(emailString) {
            self.save(emailString);
            electron.ipcRenderer.send('send-email', emailString);
        });
    }
}

module.exports = new ImageFile();