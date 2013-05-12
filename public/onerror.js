(function() {

    var callMaxNumberOfTimes = function(maxNumberOfInvocations, func) {
        var errorCount = 0;

        return function() {
            if (errorCount++ > maxNumberOfInvocations) return;

            func.apply(this, arguments);
        }
    };


    var oldOnError = window.onerror;

    var handleOnError = function(errorMsg, file, lineNumber) {
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

    window.onerror = callMaxNumberOfTimes(5, handleOnError);

})();
