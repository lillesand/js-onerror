(function() {

    var oldOnError = window.onerror;

    window.onerror = function(errorMsg, file, lineNumber) {
        try {
            var url = window.location.href;
            var logUrl = '/log?msg=' + encodeURIComponent(errorMsg) + '&url=' + encodeURIComponent(url);

            new Image().src = logUrl;
        } catch(e) {
            // we don't want errors to throw inside onerror
        }

        if (typeof oldOnError === 'function') {
            oldOnError.apply(this, arguments);
        }
    };

})();
