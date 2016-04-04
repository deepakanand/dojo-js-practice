(function() {
	
	// Producer
	// Mimic an async I/O call using setTimeout
	//
	// url parameter - is to make this fake I/O function look
	//					like an AJAX call that gets data from a url
	// successCallback - is the user-specified function that 
	//					executes on completion of the async operation
	var asyncFunction = function(url, successCallback) {

		setTimeout(function() {
			var data = url.substr(url.lastIndexOf('/')+1);
			successCallback(data);
		}, 2000);

	}

	// Consumer
	//
	// Example 1: Simple	
	// Specify the function to be executed after execution 
	// of the async function.
	asyncFunction('http://foo.com/resource1', function(data) {
		console.log('example 1: ' + data);
	});


	// Example 2: Nested Callbacks can get unweildy a.k.a callback hell
	asyncFunction('http://foo.com/resource1', function(data) {
		if(data === 'resource1'){
			console.log('example 2: '+data);
			asyncFunction('http://foo.com/resource2', function(data){
				if(data === 'resource2'){
					console.log('example 2: '+data);
					asyncFunction('http://foo.com/resource3', function(data){
						console.log('example 2: '+data);
					});
				}
			});
		}
	});
})();