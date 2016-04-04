require([
	'dojo/Deferred'

], function(Deferred) {


	// Producer
	// Mimic an async I/O call using setTimeout
	// Return a promise
	//
	// url parameter - is to make this fake I/O function look
	//					like an AJAX call that gets data from a url
	// successCallback - is the user-specified function that 
	//					executes on completion of the async operation
	var asyncFunction = function(url) {
		var deferred = new Deferred();

		setTimeout(function() {
			var data = url.substr(url.lastIndexOf('/')+1);
			if(data.indexOf('resource') === -1){
				deferred.reject('bad request: '+data);
			}
			deferred.resolve(data);
		}, 2000);

		return deferred.promise;
	}

	// Consumer
	//
	// Example 1: Simple
	// Specify a function to then() to be executed when the async
	// function is successful
	var asyncFunctionPromise = asyncFunction('http://foo.com/resource1');


	// Write business logic to execute after the async function completes
	asyncFunctionPromise.then(function(data) {
		console.log('example 1 1st time:' + data);
	});

	// The same promise can have multiple consumers
	asyncFunctionPromise.then(function(data) {
		console.log('example 1 2nd time:' + data);
	});


	// Example 2: Multiple async calls
	// Avoid unweildy callback nesting by chaining promises
	asyncFunction('http://foo.com/resource1').then(function(data) {
		if (data === 'resource1') {
			console.log('example 2: ' + data);
			return asyncFunction('http://foo.com/resource2');
		}
	}).then(function(data) {
		if (data === 'resource2') {
			console.log('example 2: ' + data);
			return asyncFunction('http://foo.com/resource3');
		}
	}).then(function(data) {
		if (data === 'resource3') {
			console.log('example 2: ' + data)
		}
	});

	// Example 3: Handling errors
	// A second function specified to then() acts as the error callback
	// If a seconda second function is consider an errback can be specified to then()
	asyncFunction('http://foo.com/bar').then(function(data){
		console.log('success');
	}, function(err){
		console.log('Example 3: fail: '+err);
	});

	// Example 4: Handling errors:
	// An errback can be specified to otherwise()
	asyncFunction('http://foo.com/baz').then(function(data){
		console.log('success');
	}).otherwise(function(err){
		console.log('Example 4: fail: '+err);
	});


});