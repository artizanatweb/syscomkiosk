const nodemailer = require('nodemailer');
const fs = require('fs');
const electron = require('electron');
const buttonEvents = require('./ButtonEvents');
const ImageFile = require('./ImageFile');

class EmailService
{
    constructor() {
        // electron.app.quit();
        // get config

        this.subject = "Kiosk email...";
        this.text = 'test test';

        this.config = {};

        try {
            let rawConfig = fs.readFileSync(__dirname + '/../config.json','utf8');
            let config = JSON.parse(rawConfig);

            if (!config.hasOwnProperty('nodemailer')) {
                throw new Error('Incorrect config file!');
            }

            this.config = config.nodemailer;

            if (!this.config.hasOwnProperty('auth')) {
                throw new Error('Missing auth!');
            }

            if (!this.config.auth.hasOwnProperty('user')) {
                throw new Error('Missing auth.user!');
            }

            if (!this.config.auth.hasOwnProperty('pass')) {
                throw new Error('Missing auth.password!');
            }
        } catch (error) {
            console.log("Can't load config.json file!");

            electron.app.quit();
        }

        this.from = this.config.auth.user;

        // set transporter
        this.transporter = nodemailer.createTransport(this.config);

        this.bindListener();
    }

    sendEmail(emailTarget) {
        console.log('Message sent: %s', emailTarget);
        let mailOptions = {
            from: this.from,
            to: emailTarget,
            subject: this.subject,
            text: this.text,
            attachments: [
                {
                    path: ImageFile.imageData
                }
            ]
        };

        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            }
        });
    }

    bindListener() {
        var self = this;

        electron.ipcMain.on('send-email', function(event, emailString) {
            self.sendEmail(emailString);
        });
    }
}

module.exports = EmailService;