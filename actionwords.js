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

var Helpers = {
	account: {
		default: {
			rpDisplayName: "ACME Corporation",
			displayName: "John P. Smith",
			name: "john.p.smith@example.com",
			id: "5757dfa7-c89d-4ff5-a820-b8a6cbdea281",
			imageURL: "http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
		},
		// basic: {

		// },
		// missingRpDisplayName: {

		// },
		// missingDisplayName: {

		// }
	},
	cryptoParameters: {
		default: {
			type: 'ScopedCred',
			algorithm: 'RSASSA-PKCS1-v1_5'
		}
	},
	attestationChallenge: {
		default: "a76262397000461a8feae698b1a9712714e9aa740ddf4073901a30b9e2aa5a59"
	},
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
	assertInstanceOf: function (object, constructor, message) {
		assert.instanceOf (object, constructor, message);
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
	},
	callMakeCredential: function(account_information, crypto_parameters, attestation_challenge, credential_timeout_seconds, blacklist, credential_extensions) {
		console.log ("calling makeCredential");
		Helpers.makeCredentialReturn = window.webauthn.makeCredential(account_information, crypto_parameters, attestation_challenge, credential_timeout_seconds, blacklist, credential_extensions);
		console.log ("makeCredential done, returned:", Helpers.makeCredentialReturn);
		return Helpers.makeCredentialReturn;
	},
	callGetAssertion: function() {
		this.callGetAssertionReturn = window.webauthn.getAssertion();
		return this.callGetAssertionReturn;
	},
};