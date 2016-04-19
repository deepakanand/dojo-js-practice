# Notes on Dojo, ES5 and strict mode
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Feature comparison: Dojo vs ES5](#feature-comparison-dojo-vs-es5)
  - [[Dojo: lang.hitch]](#dojo-langhitch)
  - [[Dojo array functions]](#dojo-array-functions)
  - [[Dojo JSON functions]](#dojo-json-functions)
  - [Dojo.isArray](#dojoisarray)
  - [Dojo string.trim](#dojo-stringtrim)
- [Strict mode](#strict-mode)
	- [What is strict mode?](#what-is-strict-mode)
  - [Challenges of using strict mode in code mixed with Dojo code](#challenges-of-using-strict-mode-in-code-mixed-with-dojo-code)
  - [What are the alternatives?](#what-are-the-alternatives)
    - [1. Do not use dojo/declare in new code](#1-do-not-use-dojodeclare-in-new-code)
    - [2. To use dojo/declare and strict mode together](#2-to-use-dojodeclare-and-strict-mode-together)
      - [2.1 Use strict mode at the individual function level](#21-use-strict-mode-at-the-individual-function-level)
      - [2.2 If you only want single level inheritance](#22-if-you-only-want-single-level-inheritance)
      - [2.3 Use a named function expression](#23-use-a-named-function-expression)
    - [Summary of ES5 features](#summary-of-es5-features)
    - [Interesting comments from other sources](#interesting-comments-from-other-sources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Feature comparison: Dojo vs ES5 
### [Dojo: lang.hitch]  

[Dojo: lang.hitch]: <https://dojotoolkit.org/reference-guide/1.10/dojo/_base/lang.html#hitch>
hitch can be used to specify a context to a function. It is typically used in async callback functions   
Eg.

```javascript
var FormView_hitch = {  
  addEventListeners: function(){ 
    var btn = $('#btn1');
    var handleClick =  function(event){
      this.doMore(); 
    };    
    btn.on('click', lang.hitch(this, handleClick));     
  },
  doMore: function(){
  // more business logic
  }
};
FormView_hitch.addEventListeners();
```
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

### Dojo.isArray 
can be replaced with Array.isArray

### Dojo string.trim 
can be replaced with String.prototype.trim

## Strict mode

### What is strict mode?
Strict mode was introduced in ES5. This is a way to opt-in to a restricted and safe variant of the language thereby avoiding the problematic bits.
More importantly, it is the future of newer versions of the language.
http://www.2ality.com/2014/12/one-javascript.html
ES6 modules(and classes) will be in strict mode by default i.e. without needing the ‘use strict’ pragma.

### Challenges of using strict mode in code mixed with Dojo 
  
* arguments.callee is not supported in strict mode
* Dojo’s declare module uses arguments.callee to support the super call feature i.e. ```this.inherited(arguments)```.
 [Link to dojo/declare code]
 [Link to dojo/declare code]: <https://github.com/dojo/dojo/blob/master/_base/declare.js#L104>
* Applications tend to use dojo/declare heavily over time.
#### Demo:
Run the js fiddle link and open the console
https://jsfiddle.net/deepakanand/hrzeqe68/6/
You will see the following error
```TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them```

### What are the alternatives?

#### 1. Do not use dojo/declare in new code 
* This enables you to start using strict mode for new code at the Dojo module level
```javascript
define([
  // dependencies
]function(){
  'use strict';  
  //business logic  
});
```
The obvious delta with this approach is that you cannot use the class-based programming pattern anymore. 

#### 2.  To use dojo/declare and strict mode together
##### 2.1 Use strict mode at the individual function level
* If you need to use declare, use the strict mode at the individual function level where there is no usage of ```this.inherited(arguments)```
```JavaScript
define([
  // dependencies
]function(){
  return declare([/* Super 'class' modules */], {    
    updateFoo: function(){
      'use strict';      
      // business logic
    },   
    _setBarAttr: function(val){
      this.inherited(arguments);
      // business logic  
    }    
  });    
});
```
##### 2.2 If you only want single-level inheritance
You can look up the super-class's prototype chain to get at the super-method like so
```JavaScript
<SuperClass>.prototype.<superMethod>.apply(this, arguments); `
// <SuperClass> is the module name
// <superMethod> is the method name
```
Demo:
https://jsfiddle.net/deepakanand/hrzeqe68/4/

##### 2.3 Use a named function expression
```javascript
// strict mode incompatible
foo: function() {
    this.inherited(arguments);
}

// strict mode compatible
foo: function foo() {
    this.inherited({callee: foo}, arguments);
}
```
Source:  https://github.com/Microsoft/TypeScript/issues/3576

Demo: https://jsfiddle.net/deepakanand/hrzeqe68/8/

#### Summary of ES5 features
Source: https://gist.github.com/sym3tri/2425983

- Trailing commas are ok
- No reserved words for property names
- NaN, Infinity, undefined : are all constants
- parseInt() defaults to radix 10
- /regexp/ produces new reg ex object every time
- JSON.parse(), JSON.stringify()
- Function.prototype.bind
- String.prototype.trim
- Array.prototype.every, filter, forEach, indexOf, lastIndexOf, map, reduce, reduceRight, some, 
- Date.now()
- Date.prototype.toISOString
- new Date(string) and Date.parse(string) will try ISO format 1st
- Array.isArray()
- Object.keys(),Object.create(),Object.defineProperty, Object.defineProperties,Object.getOwnPropertyDescriptor(),Object.getOwnPropertyNames(obj), Object.getPrototypeOf(obj)
- Object.seal(),Object.freeze(),Object.preventExtensions(), Object.isSealed(), Object.isFrozen(),Object.isExtensible()
- Property attributes: writeable, value, enumerable, configurable, get, set

- Strict Mode: 
  -- No more implied global variables within functions.
  -- this is not bound to the global object by function form.
 --  apply and call do not default to the global object.
  -- No with statement.
  -- Setting a writeable: false property will throw.
  -- Deleting a configurable: false property will throw.
  -- Restrictions on eval.
  -- eval and arguments are reserved.
  -- arguments not linked to parameters.
  -- No more arguments.caller or arguments.callee.
  -- No more octal literals.
  -- Duplicate names in an object literal or function parameters are a synt

#### Interesting comments from other sources

http://yuiblog.com/blog/2010/12/14/strict-mode-is-coming-to-town/
"Strict mode is the most important feature of ES5"


https://devchat.tv/js-jabber/062-jsj-dojo-with-dylan-schiemann
Dylan(CEO of Sitepen)
"to be honest, strict mode isn’t the most exciting thing to us. When we do run tests and compare the performance gains by stripping out features that you wouldn’t use in strict mode, it doesn’t save us a lot more than just using the normal closure compiler. Maybe it shaves a couple more percent off the size of our codebase. It’s not as big of a gain as we expected so it hasn’t been as high of a priority for us. I know why people like it, of course. Basically, the normal closure compiler gives us 90% of the gains we normally get and strict mode just adds a little bit more on top. So, it hasn’t been as high of a priority. "

https://github.com/csnover/dojo2-core#linting
"Strict mode is not supported across all platforms supported by the toolkit, which means that code will execute differently on different platforms if "use strict" is enabled. Furthermore, certain frameworks like .NET walk call chains using arguments.callee and will break if any function within the call chain uses "use strict". Since strict mode provides no substantial benefit when code is already being passed through a linter, its use within the toolkit is forbidden. "
