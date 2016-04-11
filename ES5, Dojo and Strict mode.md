#Notes on Dojo, ES5 and strict mode

## Feature comparison: Dojo vs ES5 
### [Dojo: lang.hitch]  

[Dojo: lang.hitch]: <https://dojotoolkit.org/reference-guide/1.10/dojo/_base/lang.html#hitch>
hitch can be used to specify a context to a function. It is typically used in async allback functions   
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

Dojo.isArray can be replaced with Array.isArray
Dojo string.trim can be replaced with String.prototype.trim

## Strict mode
TODO


  
