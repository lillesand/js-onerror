window.onerror = function(errorMsg, file, lineNumber) {
    var url = window.location.href;
    var logUrl = '/log?msg=' + encodeURIComponent(errorMsg) + '&url=' + encodeURIComponent(url);

    new Image().src = logUrl;
};
