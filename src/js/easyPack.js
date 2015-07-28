(function (window) {
    'use strict';

    console.log('SDK Initialize');

    var easyPack = new function() {
        this.options = {
            cacheLifetime: 3600 // in seconds
        };

        this.getOptions = function () {
            return this.options;
        };

        this.setOptions = function (customOptions) {
            if (typeof customOptions !== 'undefined' && typeof customOptions === 'object') {
                this.options = customOptions;
            }
        };

    }();

    window.easyPack = easyPack;
}(this));
