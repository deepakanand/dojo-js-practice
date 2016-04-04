(function() {


	// Mimic an async I/O call using setTimeout
	//
	// url parameter - is to make this fake I/O function look
	//					like an AJAX call that gets data from a url
	// successCallback - is the user-specified function that 
	//					executes on completion of the async operation
	var asyncFunction = function(url, successCallback) {


		var executorFn = function(resolve, reject) {

			setTimeout(function() {
				var data = url.substr(url.lastIndexOf('/') + 1);
				if (data.indexOf('resource') === -1) {
					reject('bad request: ' + data);
				}
				resolve(data);
			}, 2000);

		};

		var promise = new Promise(executorFn);

		return promise;
	}

	//
	// Example 1: Simple
	// Specify a function to then() to be executed when the async
	// function is successful
	var asyncFunctionPromise = asyncFunction('http://foo.com/resource1');


	// Write business logic to execute after the async function completes
	asyncFunctionPromise.then(function(data) {
		console.log('example 1' + data);
	});

}());