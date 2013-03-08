window.onerror = function(errorMsg, url, lineNumber) {
    var params = $.param({
        msg: errorMsg,
        url: url,
        lineNumber: lineNumber
    });
    var logUrl = 'http://example.org/endpoint?' + params;

    new Image().src = logUrl;
};
