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




});
