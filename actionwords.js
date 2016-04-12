// Template: actionwords.hbs
var assert = chai.assert;

var Util = {
	getParameterByName: function(name) {
		url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	},
	loadScript: function(url, callback) {
		console.log("loading script:", url);
		var script = document.createElement("script");
		script.type = "text/javascript";

		if (script.readyState) { //IE
			script.onreadystatechange = function() {
				if (script.readyState == "loaded" ||
					script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else { //Others
			script.onload = function() {
				callback();
			};
		}

		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	}
};

var Actionwords = {
	assertIsDefined: function(value, message) {
		assert.isDefined(value, message);
	},
	assertIsFunction: function(value, message) {
		assert.isFunction(value, message);
	},
	assertIsObject: function(value, message) {
		assert.isObject(value, message);
	},
	init: function(cb) {
		// load client script
		var clientScript = Util.getParameterByName("client-script");
		if (clientScript) {
			Util.loadScript(clientScript, function() {
				Client.init(cb);
			});
		} else {
			cb();
		}
	}
};