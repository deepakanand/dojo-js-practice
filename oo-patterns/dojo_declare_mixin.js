require([
    "dojo/_base/declare",

], function(declare) {

    var Super = declare(null, {

        constructor: function(b, c) {
            console.log("Super - Constructor");
        },

        methodInSuper: function() {
            console.log("Parent - Method in Super Only");
        },

        methodA: function() {
            console.log("Super - Method A");
        },

        methodB: function() {
            console.log("Super - Method B");
        }
    });


    // Private modules/mixins not to be instantiated
    // Use them only to mix in features
    // Think of them as has-a / composition
    var Mixin_1 = declare(null, {
        constructor: function() {
            console.log("Mixin_1 - Constructor");
        },

        methodMixin1: function() {
            console.log("method in Mixin_1")
        },

        methodA: function() {
            this.inherited(arguments);
            console.log("extended methodA in Mixin_1");
        }
    });


    var Mixin_2 = declare(null, {
        constructor: function() {
            console.log("Mixin_2 - Constructor");
        },
        methodA: function() {
            this.inherited(arguments);
            console.log("extended methodA in Mixin_2");
        }
    });

    var FrankenClass = declare([Super, Mixin_1, Mixin_2]);


    console.log("---------------------------------------");

    var instance = new FrankenClass();
    instance.methodA();

    console.log("---------------------------------------");

});