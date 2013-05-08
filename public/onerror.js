(function() {

    var maxNumberOfErrors = 5;
    var errorCount = 0;

    window.onerror = function(errorMsg, file, lineNumber) {
        // prevent infinite loops
        errorCount += 1;
        if (errorCount > maxNumberOfErrors) return;

        try {
            var url = window.location.href;
            var logUrl = '/log?msg=' + encodeURIComponent(errorMsg) + '&url=' + encodeURIComponent(url);

            new Image().src = logUrl;
        } catch(e) {
            // we don't want errors to throw inside onerror
        }
    };

})();

