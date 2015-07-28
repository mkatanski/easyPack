(function (window) {
    'use strict';

    console.log('SDK Initialize');

    var easyPack = new function() {
        this.options = {
            cacheLifetime: 3600 // in seconds
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

        /**
         * Checks if browser supports local storage
         * @returns {boolean} True if browser supports local storage
         * @private
         */
        function _supportsHtml5Storage() {
            try {
                return 'localStorage' in window && window.localStorage !== null;
            } catch (e) {
                return false;
            }
        }

        /* PUBLIC METHODS */

        /**
         * Get options object
         * @returns Options object
         */
        this.getOptions = function () {
            return this.options;
        };

        /**
         * Set new options
         * @param customOptions
         */
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

        /**
         * Load data from cache
         * @returns {object} json object
         */
        this.loadFromCache = function () {
            var timeObject = new Date();
            if (!_supportsHtml5Storage()) {
                return null;
            }

            var jsonString = localStorage.getItem('easyPackCache');
            if (jsonString === null) {
                return null;
            }

            var json = JSON.parse(jsonString);
            if (parseInt(json.expire) > timeObject.getTime()) {
                return json;
            }
            return null;
        };

        /**
         * Save json object to local storage. It also creates expiration time based on current settings.
         * @param data json object with list of machines
         * @returns {boolean} True if data was saved in local storage
         */
        this.saveToCache = function (data) {
            if (!_supportsHtml5Storage() || typeof data === 'undefined') {
                return false;
            }

            var timeObject = new Date();
            timeObject.setSeconds(timeObject.getSeconds() + this.options.cacheLifetime);
            data.expire = timeObject.getTime();

            localStorage.setItem('easyPackCache', JSON.stringify(data));

            return true;
        };

    }();

    window.easyPack = easyPack;
}(this));
