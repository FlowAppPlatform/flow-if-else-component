# Flow if-else component
The component is designed using Flow SDK to implement if-else logic.

*To use the component, in your NodeJS project, get it from npm registry*

```
npm install flow-if-else-component --save
```

*Use the component as below*

```javascript
// require the component
const Component = require('flow-if-else-component');

// create instance of the component
const component = new Component();
```

*Provide the Code property*

```javascript
let a = 1;
// the 'condition' and at least one of 'if' and 'else' are required here
component.getProperty('Code').data = {
  condition : true,
  if        : function () { a++; },
  else      : function () { a--; }
};
```

*That's all, now listen in for port emit events*
```javascript
component.getPort('Success').onEmit(function(){
  // the code executed withour errors
  // a = 2 here
});

component.getPort('Error').onEmit(function(){
  // an error occured
  // the actual error can be accessed through the 'Data' property of the port
  let err = component.getPort('Error').getProperty('Data').data;
});


// mandatory to execute the component
component.execute();
```

*The Code property explained*

```javascript
let code = {
  condition : false,
  if        : function () { a++; },
  else      : {
    condition : true,
    if        : function () { a--; },
    else      : function () { a = 4; }
  }
};
// the above is equivalent to
if (code.condition) { a++; }
else if (code.else.condition) { a--; }
else { a = 4; }
```

#### Conclusion

That's all required to use Flow's If-else component.