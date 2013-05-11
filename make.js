require('shelljs/make');

target.test = function() {
    exec('mocha test/functional/test.js --ui exports --timeout 10000');
};

target.proxy = function() {
    exec('sh test/functional/lib/browsermob/bin/browsermob-proxy');
};

target.selenium = function() {
    exec('java -jar test/functional/lib/selenium-server-standalone-2.32.0.jar -Dwebdriver.chrome.driver=test/functional/lib/chromedriver');
};
