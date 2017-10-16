/* 
 * Author: Daniel Cana
 * Github: https://github.com/artizanatweb/
 * Web: http://www.artizanatweb.ro
 * Email: artizanatweb@gmail.com
 * Tel: 0723 846 180
 */


window.$ = window.jQuery = window.jquery = require("jquery");

class ClientWindow
{
    constructor() {
        this.resizeTimer = 0;
    }
    
    setScreenSize() {
        this.width = parseInt( $( window ).width() );
        this.height = parseInt( $( window ).height() );
    }

    static getWidth() {
        return this.width;
    }
    
    static getHeight() {
        return this.height;
    }

    bindResize() {
        let self = this;
        $( window ).on('resize', function(event) {
            clearTimeout(self.resizeTimer);

            self.resizeTimer = setTimeout(function() {
                self.setScreenSize();
            }, 300);
        });
    }

    start() {
        this.setScreenSize();
        this.bindResize();
    }
}

module.exports = new ClientWindow();