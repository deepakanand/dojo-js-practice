// A simple inheritance example using dojo declare
// doFoo() method in the subclass extends the super class version

require([    
    "dojo/_base/declare"
], function(declare){
    
    var Super = declare(null, {    
        doFoo: function(){
           console.log("super foo");            
        }    
    });
    
    
    var Sub = declare(Super, {    
        doFoo:function(){       
            // call super method
            this.inherited(arguments);
            
            console.log("sub foo");
        }    
    });
            
    var  obj = new Sub();
    
    obj.doFoo();
});