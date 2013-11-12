"use strict";

var http = require('http');
var winston = require('winston');
var TransparentProxy = require('./Processors/TransparentProxy');

var proxyServerPort = 9001;
winston.info("Proxy server started on " + proxyServerPort);

http.createServer(function (request, response) {
    winston.info("Received request for: " + request.url);
    forwardRequestAndProcessResponse(request, response, new TransparentProxy().process);
}).listen(proxyServerPort);

function forwardRequestAndProcessResponse(request, response, delegate) {
    var forwardRequest = http.request(request.url, function(forwardResponse) {
        delegate(response, forwardResponse);
    });
    forwardRequest.end();
}