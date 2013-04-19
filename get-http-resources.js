/**
 * Find request with http on a https page
 * Usage : phantomjs get-http-resources.js --url=https://google.com --verbose=true
 */
var GetHttpResources = function () {
    this._args = this.getArguments();
    this.checkUrlArgument();
    this.get();
};

/**
 * Dummy argument parser
 * which parses --url=foobar and --verbose=true
 */
GetHttpResources.prototype.getArguments = function () {
    var sys = require('system');
    var args = sys.args,
        arg;
        
    var result = {
        url : null,
        verbose : false
    };

    for(var i = 0; i < args.length; i++) {
        arg = args[i];

        if (arg.indexOf("--url=") === 0) {
            result.url = arg.replace("--url=", "").trim();
        }
        else if (arg.indexOf("--verbose=") === 0) {
            result.verbose = arg.replace("--verbose=", "").trim() == "true";
        }
    }

    return result;
};


/**
 * Check if url param set
 */
GetHttpResources.prototype.checkUrlArgument = function () {
    if (!this._args.url) {
        console.log("ERROR: You have to specify valid https URL with --url=<https://URL> argument");
        phantom.exit(1);
    }
    else if (!this._args.url.match('^https:\/\/')) {
        console.log("ERROR: This url doesn't start with https://");
        phantom.exit(1);
    }
};


/**
 * Log message to console if verbose option set
 */
GetHttpResources.prototype.log = function (message) {
    if (this._args.verbose) {
        console.log(message);
    }
};

/**
 * Get HTTP resources on SSL
 */
GetHttpResources.prototype.get = function () {
    var page = require('webpage').create();
    var httpResources = [];
    var that = this;

    page.onResourceRequested = function (req) {
        that.log("Checking url : " + req.url);
        if (req.url.match('^http:\/\/')) {
            that.log("Found HTTP Resource: " + req.url);
            httpResources.push(req.url);
        }
    };

    page.settings.userAgent = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)';
    
    page.open(that._args.url, function (status) {
        if (status !== 'success') {
            console.log('ERROR: Failed to load URL :' + that._args.url);
        } else {
            if (httpResources.length === 0) {
                console.log('No HTTP resources found');
            }
            else {
                console.log(' ---------- ' + httpResources.length + ' items found ------------');
                console.log(' ----------------------------------------------------------------');

                for (var i = 0, ii = httpResources.length; i < ii; i++) {
                    console.log(httpResources[i]);
                }
            }
        }
        phantom.exit();
    });
};

new GetHttpResources();
