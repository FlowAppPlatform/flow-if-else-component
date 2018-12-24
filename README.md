# Flow if-else component
The component evaluates an expression to true or false.

*To use the component, in your NodeJS project, get it from npm registry*

```
npm i flow-if-else-component --save
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
```

*Execute the component*
```javascript
// add the component to a graph before executing it
const Graph = require('flow-platform-sdk').Graph;
new Graph("graph-1").addComponent(component);
```

#### Conclusion

That's all required to use Flow's If-else component.