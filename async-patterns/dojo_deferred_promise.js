require([
	'dojo/Deferred'

], function(Deferred) {


	// Producer
	// Mimic an async I/O call using setTimeout
	// Return a promise
	//
	// url parameter is to make this fake async function look
	//		like an AJAX call that gets data from a url
	// successCallback is the user-specified function that 
	//	executes on completion of the async operation
	var asyncFunction = function(url) {
		var deferred = new Deferred();

		setTimeout(function() {
			var data = 'foo';
			deferred.resolve(data);
		}, 2000);

		return deferred.promise;

	}

	// Consumer
	// Invoke the async function
	var asyncFunctionPromise = asyncFunction('http://foo.com/resource1');

	// Write business logic to execute after the async function completes
	asyncFunctionPromise.then(function(data) {
		console.log(data);
		console.log('finished');
	});

	console.log('starting');

});