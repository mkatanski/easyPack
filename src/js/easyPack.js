(function (window) {
    'use strict';

    console.log('SDK Initialize');

    var easyPack = new function() {
        this.options = {
            cacheLifetime: 3600 // in seconds
        };

        /* PUBLIC METHODS */

        this.getOptions = function () {
            return this.options;
        };

        this.setOptions = function (customOptions) {
            if (typeof customOptions !== 'undefined' && typeof customOptions === 'object') {
                this.options = customOptions;
            }
        };

        /**
         * Asynchronous method that gets list of machines as json object
         * @param callback it accepts one param with returned json object
         */
        this.getList = function(callback) {
            var httpRequest = _createHttpRequest();
            if (!httpRequest) { return; }

            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200) {
                        var data = JSON.parse(httpRequest.responseText);
                        if (callback) { callback(data); }
                    }
                }
            };
            httpRequest.open('GET', 'https://api-pl.easypack24.net/v4/machines?type=0');
            httpRequest.send();
        };

        /* PRIVATE METHODS */

        /**
         * Tries to create XMLHttpRequest instance or Microsoft.XMLHTTP if it runs on older IE
         * @returns {object} XMLHttpRequest or Microsoft.XMLHTTP
         * @private
         */
        function _createHttpRequest() {
            var httpRequest = false;

            if (typeof ActiveXObject !== 'undefined') {
                try {
                    httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
                    return httpRequest;
                } catch(e) {
                    httpRequest = false;
                }
            }

            try {
                httpRequest = new XMLHttpRequest();
                return httpRequest;
            } catch(e) { }
            return null;
        }

    }();

    window.easyPack = easyPack;
}(this));
