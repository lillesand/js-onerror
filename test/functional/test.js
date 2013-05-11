var browsermob = require('node-browsermob-proxy'),
    fs = require('fs'),
    _ = require('underscore'),
    http = require('http'),
    connect = require('connect'),
    assert = require('assert'),
    path = require('path');

var proxy = browsermob();

var errorRequestRegex = /log\?/;

var errorRequestFromEntries = function(entries) {
    return _.filter(entries, function(entry) {
        return errorRequestRegex.test(entry.request.url);
    });
}

var withServer = function(callback) {
    var app = connect()
        .use(connect.static(path.join(__dirname, 'files')))
        .use(connect.static(path.join(__dirname, '..', '..', 'lib')));

    var server = http.createServer(app);

    var done = function() {
        server.close();
    };

    server.listen(8459, function() {
        callback(done)
    });
}

var getRequests = function(testHtml, callback) {
    var baseUrl = 'http://127.0.0.1:8459/';

    withServer(function(done) {
        proxy.generateHAR(baseUrl + testHtml, { logLevel: 'silent', browser: 'chrome' }, function(err, data) {
            done();

            if (err) return callback(err);

            var entries = data.log.entries;

            callback(null, entries);
        })
    });
}

module.exports = {
    'handles no errors': function(done) {
        getRequests('noerrors/index.html', function(err, entries) {
            var errorRequests = errorRequestFromEntries(entries);

            assert(errorRequests.length === 0);

            done();
        });
    },

    'finds where on error': function(done) {
        getRequests('oneerror/index.html', function(err, entries) {
            var errorRequests = errorRequestFromEntries(entries);

            assert(errorRequests.length === 1);

            done();
        });
    },

    'includes current url': function(done) {
        getRequests('oneerror/index.html', function(err, entries) {
            var errorRequests = errorRequestFromEntries(entries);
            var request = errorRequests[0].request;

            var currentUrl = encodeURIComponent('http://127.0.0.1:8459');

            assert(request.url.indexOf(currentUrl) != -1);

            done();
        });
    }
};
