require([
	'dojo/Deferred'

], function(Deferred) {


	// Producer
	// 1. Imagine that asyncFunction is a an XHR call
	// 2. Wrap the XHR such that it returns a Deferred.promise 
	// 		In practice, you dont need to - dojo/request does this for you
	var asyncFunction = function() {
		var deferred = new Deferred();

		setTimeout(function() {
			deferred.resolve({
				success: true
			});
		}, 2000);

		return deferred.promise;

	}

	// Consumer
	// Invoke the async function
	var asyncFunctionPromise = asyncFunction();

	// Write business logic to execute after the async function completes
	asyncFunctionPromise.then(function(success) {
		console.log(success);
	});

});