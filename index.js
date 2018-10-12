const Flow = require('flow-platform-sdk');

/*
 * 
 * The class implements if-else logic
 *  
 */

class Component extends Flow.Component {
  constructor() {
    super();
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
        value = eval(this.getProperty('Expression').data);
      } catch(e) {/* ignore, value remains false anyway */}
      
      const port = this.getPort(value ? 'True' : 'False');
      port.emit();

      this.taskComplete();

    });

  }
}

module.exports = Component;