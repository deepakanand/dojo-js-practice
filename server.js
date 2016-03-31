// TODO: FixMe

var loadModules = [
'src/deferred_example', 
//'src/mixins_1',
//'src/mixins_2'
];

dojoConfig = {
	baseUrl: "..", // Where we will put our packages
	async: 1, // We want to make sure we are using the "modern" loader
	hasCache: {
		"host-node": 1, // Ensure we "force" the loader into Node.js mode
		"dom": 0 // Ensure that none of the code assumes we have a DOM
	},

	packages: [{
		name: "dojo",
		location: "./node_modules/dojo"
	}, {
		name: "src",
		location: "./src"
	}],

	deps: loadModules// And array of modules to load on "boot"
};

// Now load the Dojo loader
require("../node_modules/dojo/dojo.js");

