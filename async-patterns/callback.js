(function() {
	// Example 1
	//
	// Producer
	// Mimic an async I/O call using setTimeout
	//
	// url parameter is to make this fake async function look
	//		like an AJAX call that gets data from a url
	// successCallback is the user-specified function that 
	//	executes on completion of the async operation
	var asyncFunction = function(url, successCallback) {

		setTimeout(function() {
			var data = url.substr(url.lastIndexOf('/')+1);
			successCallback(data);
		}, 2000);

	}

	// Consumer
	// Invoke the async function
	asyncFunction('http://foo.com/resource1', function(data) {
		console.group('example 1');
		console.log(data);
		console.groupEnd();
	});


	// Example 2: callbacks can get unweildy aka callback hell

	asyncFunction('http://foo.com/resource1', function(data) {
		if(data === 'resource1'){
			asyncFunction('http://foo.com/resource2', function(data){
				if(data === 'resource2'){
					asyncFunction('http://foo.com/resource3', function(data){
						console.group('example 2');
						console.log(data);
						console.groupEnd();
					});
				}
			});
		}
	});
})();