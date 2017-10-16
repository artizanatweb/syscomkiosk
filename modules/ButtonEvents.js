const EventEmitter = require('events');

class ButtonEvents extends EventEmitter {}

module.exports = new ButtonEvents();