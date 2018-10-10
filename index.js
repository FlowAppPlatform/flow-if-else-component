const Flow = require('flow-platform-sdk');

/*
 * 
 * The class impplements if-else logic
 *  
 */

class Component extends Flow.Component {
  constructor() {
    super();
    this.name = 'If-else Component';

    /*
    *
    * {
    *    condition,
    *    if: function,
    *    else: { condition, if, else }
    * }
    * 
    */
    const code = new Flow.Property('Code', 'object');
    code.required = true;
    this.addProperty(code);

    var success = new Flow.Port('Success');
    var error = new Flow.Port('Error');
    
    var response = new Flow.Property('Data', 'Text');
    success.addProperty(response);

    var generalError = new Flow.Property('Data', 'object');
    error.addProperty(generalError);

    this.addPort(success);
    this.addPort(error);

    // we do logic here
    this.attachTask(function() {
      let port = this.getPort('Success');
      try {
        let result = this._execute(this.getProperty('Code').data);
        if (!(result instanceof Error))
          port.getProperty('Data').data = 'Code executed succesfully';
        else throw result;
      } catch(err) {
        // emit error
        port = this.getPort('Error');
        port.getProperty('Data').data = err;
      }
      port.emit();
      this.taskComplete();
    });

  }

  // recurring function to do nested ifs or else-if statements
  // avoid 'execute' function name which would otherwise overwrite parent execute function
  _execute(code) {
    if (!this.isCodeValid(code)) return new Error('Code missing required keys.');
    if (Boolean(code.condition)) {
      if (typeof(code.if) === 'function')
        code.if();
      else if (Boolean(code.if) && typeof(code.if) === 'object')
        this._execute(code.if);
    } else {
      if (typeof(code.else) === 'function')
        code.else();
      else if (Boolean(code.else) && typeof(code.else) === 'object')
        this._execute(code.else);
    }
  }

  isCodeValid(code={}) {
    let keys = Object.keys(code);
    return (
      (keys.includes('condition')) && 
      (keys.includes('if') || keys.includes('else'))
    );
  }

}

module.exports = Component;