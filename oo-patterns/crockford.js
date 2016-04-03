// An example of Parasitic inheritance pattern described by Douglas Crockford
(function() {

	var ParasiticSuperClass = function() {

		var counter = 0;

		return {

			count: function() {
				counter += 1;
				console.log(counter);
			}
		};
	};


	var ParasiticSubClass = function() {

		var self = ParasiticSuperClass(),
			// get a handle on the super-class method 
			// that needs to be extended here
			superCount = self.count;

		self.talk = function() {
			console.log(" i can talk also");
		};

		// extend the super-object's count
		self.count = function() {
			superCount.call(self);
			console.log(" i am count extended");
		};
		return self;
	};

	var subClassInstance = ParasiticSubClass();
	subClassInstance.count()
	subClassInstance.talk();
	subClassInstance.count()

}());