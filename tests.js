/* 
 * Tests
 */

const assert = require('assert');
const Component = require('./index');
const component = new Component();

describe(`Component Tests
`, function () {
  it('Component should have required properties and ports', function (done) {
    try {
      component.getProperty('Code');
      component.getPort('Success').getProperty('Data');
      component.getPort('Error').getProperty('Data');
      done();
    } catch (e) {
      done(e);
    }
  });
});

describe(`Logic Tests
`, function () {
  it('Valid Code property should be intepreted valid', function (done) {
    let code = {
      condition: true,
      if: function () {
        return null
      }
    };
    component.isCodeValid(code) ?
      done() :
      done(new Error('Valid code read invalid'));
  });
  it('Valid Code property should be intepreted valid', function (done) {
    let code = {
      condition: true,
      if: function () {
        return null
      },
      else: function () {
        return null
      }
    };
    component.isCodeValid(code) ?
      done() :
      done(new Error('Valid code read invalid'));
  });
  it('Invalid Code property should be intepreted invalid', function (done) {
    let code = {};
    component.isCodeValid(code) ?
      done(new Error('Invalid code read valid')) :
      done();
  });
  it('Invalid Code property should be intepreted invalid', function (done) {
    let code = { condition: false };
    component.isCodeValid(code) ?
      done(new Error('Invalid code read valid')) :
      done();
  });
  it('Should increment a', function() {
    let a = 1;
    component.getProperty('Code').data = {
      condition : true,
      if        : function () { a++; },
      else      : function () { a--; }
    };
    component.getPort('Success').onEmit(function() {
      assert.equal(a, 2);
    });
    component.getPort('Error').onEmit(function() {
      assert.equal(a, 0);
    });
    component.execute();
  });
});