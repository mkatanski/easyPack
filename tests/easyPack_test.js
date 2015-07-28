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

    });




});
