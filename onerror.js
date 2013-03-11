window.onerror = function(errorMsg, url, lineNumber) {
    var logUrl = 'http://example.org/endpoint?msg=' + encodeURIComponent(errorMsg);

    new Image().src = logUrl;
};
