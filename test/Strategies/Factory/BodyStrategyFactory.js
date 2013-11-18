var chai = require("chai");
var expect = chai.expect;
var bodyStrategyFactory = require("../../../lib/Strategies/Factory/BodyStrategyFactory");
var ReturnOriginalBody = require("../../../lib/Strategies/Body/ReturnOriginalBody");
var ReplaceBody = require("../../../lib/Strategies/Body/ReplaceBody");

describe('BodyStrategyFactory', function(){
    var bodyStrategy;
    var url;
    var rules = {};

    beforeEach(function setupDefaults() {
        url = "http://www.google.com";
        rules = {
            getUrl: function() {
                return "www.google.com"
            },
            getHeaders: function() {
                return {
                    "a": "b"
                }
            },
            getBody: function() {
                return "Test Content"
            }
        };
    });

    describe('#getStrategy()', function(){
        describe("when no url is specified", function() {
            beforeEach(function() {
                rules.getUrl = function() {
                    return undefined;
                };
            });

            describe("when no body is specified", function() {
                it('should return the ReturnOriginalBody strategy', function() {
                    bodyStrategy = bodyStrategyFactory.getStrategy(url, rules);
                    expect(bodyStrategy).to.be.an.instanceof(new ReturnOriginalBody().constructor);
                });
            });
        });

        describe("when url is specified", function() {
            describe("when no body is specified", function() {
                before(function() {
                    rules.getBody = function() {
                        return undefined;
                    };
                });

                it('should return the ReturnOriginalBody strategy', function() {
                    expect(bodyStrategy).to.be.an.instanceof(new ReturnOriginalBody().constructor);
                });
            });

            describe("when body is specified", function() {
                beforeEach(function() {
                    rules.getBody = function() {
                        return "abc";
                    };
                });

                it('should return the ReplaceBody strategy', function() {
                    bodyStrategy = bodyStrategyFactory.getStrategy(url, rules);
                    expect(bodyStrategy).to.be.an.instanceof(new ReplaceBody().constructor);
                });
            });
        });
    });
});