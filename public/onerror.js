window.onerror = function(errorMsg, url, lineNumber) {
    var logUrl = '/log?msg=' + encodeURIComponent(errorMsg);

    new Image().src = logUrl;
};
