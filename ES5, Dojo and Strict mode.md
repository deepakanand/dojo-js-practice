#Notes on Dojo, ES5 and strict mode

## Feature comparison: Dojo vs ES5 
### [Dojo: lang.hitch]  

[Dojo: lang.hitch]: <https://dojotoolkit.org/reference-guide/1.10/dojo/_base/lang.html#hitch>
hitch can be used to specify a context to a function. It is typically used in async callback functions   
Eg.

```javascript
var FormView_hitch = {  
  addEventListeners: function(){ 
    var btn = $('#btn1');
    var handleClick = function(event){
      this.doMore(); 
    };    
    btn.on('click', handleClick);     
  },
  doMore: function(){
  // more business logic
  }
};
FormView_hitch.addEventListeners();
```
The above fails when the button is clicked with the error message   
"this.doMore is not a function"

[Function.prototype.bind] can be used as a drop-in replacement for the above
[Function.prototype.bind]:<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind>
```javascript
var FormView_bind = {  
  addEventListeners: function(){   
    var btn = $('#btn2');
    var handleClick = function(event){
      this.doMore(); 
    };    
    btn.on('click', handleClick.bind(this));     
  },
  doMore: function(){
    console.log('in doMore');
  }
};
FormView_bind.addEventListeners();
```

### [Dojo array functions]
[Dojo array functions]: <http://dojotoolkit.org/reference-guide/1.10/dojo/_base/array.html>

All of the functions available in Dojo array can be replaced with their methods of the same name in Array.prototye    
* forEach  
* indexOf
* lastIndexOf
* filter
* map
* some
* reduce
* every

### [Dojo JSON functions]

[Dojo json functions]: <https://dojotoolkit.org/reference-guide/1.10/dojo/json.html>

The built JSON object is a drop-in replacement which has the parse
and stringify methods

###Dojo.isArray 
can be replaced with Array.isArray

### Dojo string.trim 
can be replaced with String.prototype.trim

## Strict mode

Strict mode was introduced in ES5. This is a way to opt-in to a restricted and safe variant of the language thereby avoiding the problematic bits.
It is also the future of newer versions of the language.
http://www.2ality.com/2014/12/one-javascript.html
ES6 modules(and classes) will be in strict mode by default i.e. without needing the ‘use strict’ pragma.

### Challenges of using strict mode in code mixed with Dojo code
  
* arguments.callee is not supported in strict mode
* Dojo’s declare module uses arguments.callee to support the super call feature i.e. ```this.inherited(arguments)```.
 [Link to dojo/declare code]
 [Link to dojo/declare code]: <https://github.com/dojo/dojo/blob/master/_base/declare.js#L104>
* Applications tend to use dojo/declare heavily over time.

### What are the alternatives?
* Start using strict mode for new code at the Dojo module level
```javascript
define([
  // depedencies
]function(){
  'use strict';  
  //business logic  
});
```
* If you need to use declare, use the strict mode at the individual function level where there is no usage of ```this.inherited(arguments)```
```javascript
define([
  // dependencies
]function(){
  return declare([/* Super 'class' modules */], {    
    updateFoo: function(){
      'use strict';      
      // business logic
    },   
    _setBarProperty: function(val){
      this.inherited(arguments);
      // business logic  
    }    
  });    
});
```
