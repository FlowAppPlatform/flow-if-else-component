const Flow = require('flow-platform-sdk');

/*
 * 
 * The class implements if-else logic
 *  
 */

class Component extends Flow.Component {
  constructor(id = null) {
    super(id);
    this.name = 'If-else Component';

    /*
     *
     * The component evaluates an expression and emits true or false based on the boolean representation of the expression
     * 
     */
    const expression = new Flow.Property('Expression', 'text');
    expression.required = true;
    this.addProperty(expression);

    this.addPort(new Flow.Port('True'));
    this.addPort(new Flow.Port('False'));

    this.attachTask(function () {

      let value = false;

      // expression could throw an error when evaluated
      try {
        // used Function in place of eval cause it's more efficient
        value = Function('"use strict";return (' + this.getProperty('Expression').data + ')')();
      } catch(e) {/* ignore, value remains false anyway */}
      
      const port = this.getPort(value ? 'True' : 'False');
      port.emit();

      this.taskComplete();

    });

  }
}

module.exports = Component;