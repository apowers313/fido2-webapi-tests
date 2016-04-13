var Client = {
	// generic client initialization code goes here... 
	// load polyfills or whatever else you need to do
	/// gets called exactly once before testing begins
	init: function(cb) {
		// load a polyfill
		Util.loadScript ("ms-webauth-polyfill.js", function() {
			cb();
		});
	}
};