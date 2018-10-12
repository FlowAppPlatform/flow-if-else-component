# Flow if-else component
The component is designed using Flow SDK to evaluate an expression to true or false.

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

*Provide the expression*

```javascript
// this can be any javascript expression, '[].length', 'a==1', ' ' and more
component.getProperty('Expression').data = 'q=1'; 
```

*That's all, now listen in for port emit events*
```javascript
component.getPort('True').onEmit(function() {
  // the expression evaluated to true
});

component.getPort('False').onEmit(function() {
  // the expression evaluated to false
});

// mandatory to execute the component
component.execute();
```

#### Conclusion

That's all required to use Flow's If-else component.