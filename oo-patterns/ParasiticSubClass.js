define([
    "./ParasiticSuperClass"
], function (ParasiticSuperClass) {

    return function () {

        var self = ParasiticSuperClass(),
            // get a handle on the super-class method that needs to be extended here
            superCount = self.count;

        self.talk = function () {
            console.log(" i can talk also");
        };

        // extend the super-object's count
        self.count = function () {
            superCount.call(self);
            console.log(" i am count extended");

        };

        return self;

    };
});