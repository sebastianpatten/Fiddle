var chai = require("chai");
var expect = chai.expect;
var headersStrategyFactory = require("../../../lib/Strategies/Factory/HeaderStrategyFactory");
var ReturnOriginalHeaders = require("../../../lib/Strategies/Headers/ReturnOriginalHeaders");
var ReplaceHeaders = require("../../../lib/Strategies/Headers/ReplaceHeaders");

describe('HeadersStrategyFactory', function(){
    var fakeUrl;
    var fakeRules;

    before(function () {
        fakeUrl = "http://www.google.com";
    });

    describe('#getStrategy()', function(){
        describe("when headers are empty", function() {
            before(function() {
                fakeRules = {
                    getUrl: function() {
                        return "www.google.com";
                    },
                    getHeaders: function() {
                        return undefined;
                    }
                };
            });

            it('should return the ReturnOriginalHeaders', function() {

                var HeaderStrategy = headersStrategyFactory.getStrategy(fakeUrl, fakeRules);
                var headerStrategy = new HeaderStrategy();
                expect(headerStrategy).to.be.an.instanceof(new ReturnOriginalHeaders().constructor);
            });
        });

//        before(function() {
//            fakeRules = {
//                url: "www.test.com",
//                headers: {
//                    seb: "test"
//                }
//            };
//        });
//
//        it('should return the ReturnOriginalHeaders when URL does not match', function() {
//            var HeaderStrategy = headersStrategyFactory.getStrategy(fakeUrl, fakeRules);
//            var headerStrategy = new HeaderStrategy();
//            expect(headerStrategy).to.be.an.instanceof(new ReturnOriginalHeaders().constructor);
//        });
//
//        before(function() {
//            fakeRules = {
//                url: "www.google.com",
//                headers: {
//                    seb: "test"
//                }
//            };
//        });
//
//        it('should return the ReplaceHeaders when URL does match', function() {
//
//            var HeaderStrategy = headersStrategyFactory.getStrategy(fakeUrl, fakeRules);
//            var headerStrategy = new HeaderStrategy();
//            expect(headerStrategy).to.be.an.instanceof(new ReplaceHeaders().constructor);
//        });
    });
});