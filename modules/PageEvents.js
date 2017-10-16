const EventEmitter = require('events');

class PageEvents extends EventEmitter {}

module.exports = new PageEvents();