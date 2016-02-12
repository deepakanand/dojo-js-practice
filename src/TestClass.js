define([
     "dojo/_base/declare",
     "dojo/_base/lang",
     "./testModule"
], function(declare, lang, testModule){

       return declare(null, {

        testClassInstanceProperty: "testClassInstanceProperty",

        runTests: function(){
            console.log(this);
            //var hitchedFunction = lang.hitch(this, fooModule.inFooModule);
            //hitchedFunction();
        }
    });
});