/* 
 * Tests
 */

const Graph = require('flow-platform-sdk').Graph;
const Component = require('./index');

const graph = new Graph("graph-1");
let component = new Component();

describe(`Component Tests
`, function () {
  it('Component should have required properties and ports', function (done) {
    try {
      component.getProperty('Expression');
      component.getPort('True');
      component.getPort('False');
      done();
    } catch (e) {
      done(e);
    }
  });
});

describe(`Logic Tests
`, function () {
  it(`'Sample Text' should emit False`, function(done) {
    component.getProperty('Expression').data = 'Sample Text';
    component.getPort('True').onEmit(function() {
      done(new Error('True emitted in place of False'));
    });
    component.getPort('False').onEmit(function() {
      done();
    });
    graph.addComponent(component);
    component.execute();
  });
  it(`'"Sample Text"' should emit True`, function(done) {
    component.getProperty('Expression').data = '"Sample Text"';
    component.getPort('True').onEmit(function() {
      done();
    });
    component.getPort('False').onEmit(function() {
      done(new Error('False emitted in place of True'));
    });
    graph.addComponent(component);
    component.execute();
  });
  it(`'' should emit False`, function(done) {
    component = new Component();
    component.getProperty('Expression').data = '';
    component.getPort('True').onEmit(function() {
      done(new Error('True emitted in place of False'));
    });
    component.getPort('False').onEmit(function() {
      done();
    });
    graph.addComponent(component);
    component.execute();
  });
  it(`[].length should emit False`, function(done) {
    component = new Component();
    component.getProperty('Expression').data = '[].length';
    component.getPort('True').onEmit(function() {
      done(new Error('True emitted in place of False'));
    });
    component.getPort('False').onEmit(function() {
      done();
    });
    graph.addComponent(component);
    component.execute();
  });
});