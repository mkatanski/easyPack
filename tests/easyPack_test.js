var expect = chai.expect,
    should = chai.should();

describe('easyPack Tests', function () {
    'use strict';

    describe('constructor', function () {

        it('should EasyPack class exists', function () {
            should.exist(easyPack);
        });

        it('should has setOptions method', function () {
            expect(easyPack.setOptions()).should.be.an('object');
        });

        it('should has getOptions method', function () {
            expect(easyPack.getOptions()).should.be.an('object');
        });

        it('should has getList method', function () {
            expect(easyPack.getList()).should.be.an('object');
        });

        it('should has loadFromCache method', function () {
            expect(easyPack.loadFromCache()).should.be.an('object');
        });

        it('should has saveToCache method', function () {
            expect(easyPack.saveToCache()).should.be.an('object');
        });

    });

    describe('options', function () {

        var defaultOptions = {
            cacheLifetime: 3600
        };

        var customOptions = {
            cacheLifetime: 1800
        };

        it('should has default options', function () {
            expect(easyPack.getOptions()).to.deep.equal(defaultOptions);
        });

        it('should has default options if custom options are invalid', function () {
            easyPack.setOptions(undefined);
            easyPack.setOptions('undefined');
            expect(easyPack.getOptions()).to.deep.equal(defaultOptions);
        });

        it('should has custom options', function () {
            easyPack.setOptions(customOptions);
            expect(easyPack.getOptions()).to.deep.equal(customOptions);
        });

    });

    describe('cache system', function () {

        var timeObject = new Date();
        timeObject.setSeconds(timeObject.getSeconds() + 3600);

        var validJson = {
            'total_count': '1234',
            'expire': timeObject.getTime(),
            '_embedded': {
                'machines' : []
            },
        };

        var validJsonNoExpire = {
            'total_count': '1234',
            '_embedded': {
                'machines' : []
            },
        };

        it('should not load data from cache', function () {
            localStorage.clear();
            expect(easyPack.loadFromCache()).to.deep.equal(null);
        });

        it('should load data from cache', function () {
            localStorage.setItem("easyPackCache", JSON.stringify(validJson));
            expect(easyPack.loadFromCache()).to.not.deep.equal(null);
        });

        it('should save data to cache', function () {
            localStorage.clear();
            easyPack.saveToCache(validJsonNoExpire);
            expect(easyPack.loadFromCache()).to.not.deep.equal(null);
        });

        it('should data from cache be valid json', function () {
            var json = easyPack.loadFromCache();

            expect(json).to.has.property('total_count');
            expect(json).to.has.property('expire');
            expect(json).to.has.property('_embedded');
            expect(json._embedded).to.has.property('machines');
            expect(json._embedded.machines).to.be.an('array');
        });

    });

    describe('retrieve list of machines', function () {

        var json;

        before(function(done){
            this.timeout(10000);
            easyPack.getList(function (data){
                json = data;
                done();
            });
        });

        it('should get json object with total_count property', function () {
            expect(json).to.has.property('total_count');
        });

        it('should get json object with _embedded property', function () {
            expect(json).to.has.property('_embedded');
        });

        it('should get json object with _embedded.machines property', function () {
            expect(json._embedded).to.has.property('machines');
        });

        it('should has _embedded.machines property as an array', function () {
            expect(json._embedded.machines).to.be.an('array');
        });

        it('should save json data to cache', function () {
            easyPack.saveToCache(json);
        });

        it('should load json data from cache', function () {
            var json = easyPack.loadFromCache();

            expect(json).to.has.property('total_count');
            expect(json).to.has.property('expire');
            expect(json).to.has.property('_embedded');
            expect(json._embedded).to.has.property('machines');
            expect(json._embedded.machines).to.be.an('array');
        });

    });




});
