'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const composeHttpContext = require('../../../dst/lib/util/compose.http.context').composeHttpContext;

describe('compose.http.context.js tests', () => {
  describe('#composeHttpContext()', () => {
    it('expect to create an instance of HTTPContext', () => {
      // arranges
      const request = {
        method: 'GET',
        path: '/sample/test/path'
      };
      const response = {};
      const processContext = {};
      const expected01 = {
        toolname: 'AtomsExpressTool',
        process: undefined,
        store: {},
        request,
        response
      };
      const expected02 = {
        toolname: 'AtomsExpressTool',
        process: processContext,
        store: {},
        request,
        response
      };

      // acts
      const result01 = composeHttpContext(request, response);
      const result02 = composeHttpContext(request, response, processContext);

      // asserts
      expect(result01).to.deep.equal(expected01);
      expect(result02).to.deep.equal(expected02);
    });
  });

  describe('#data()', () => {
    it('expect to get a default data', () => {
      // arranges
      const request = {
        method: 'GET',
        path: '/sample/test/path',
      };
      const response = {};
      const processContext = {};
      const context = composeHttpContext(request, response, processContext);
      const expected = {};

      // acts
      const data = context.data();

      // asserts
      expect(data).to.deep.equal(expected);
    });

    it('expect to get a data', () => {
      // arranges
      const request = {
        method: 'GET',
        path: '/sample/test/path',
        query: { id: 1 },
        body: { val: 'value' }
      };
      const response = {};
      const processContext = {};
      const context = composeHttpContext(request, response, processContext);
      const expected = { id: 1, val: 'value' };

      // acts
      const data = context.data();

      // asserts
      expect(data).to.deep.equal(expected);
    });

    it('expect to get a data with src and extended', () => {
      // arranges
      const request = {
        method: 'GET',
        path: '/sample/test/path',
        query: { id: 1 },
        body: { val: 'value' }
      };
      const response = {};
      const processContext = {};
      const context = composeHttpContext(request, response, processContext);
      const src = { init: 'init' };
      const ext01 = { ext01: '01' };
      const ext02 = { ext02: '02' };
      const expected = { id: 1, init: 'init', val: 'value', ext01: '01', ext02: '02' };

      // acts
      const data = context.data(src, ext01, ext02);

      // asserts
      expect(data).to.equal(src);
      expect(data).to.deep.equal(expected);
    });
  });

  describe('#append()', () => {
    let response;
    let appendSpy;

    before(() => {
      response = {
        append: () => { }
      };
      appendSpy = sinon.spy(response, 'append');
    });

    after(() => {
      appendSpy.restore();
    });

    it('expect to get a default data', () => {
      // arranges
      const request = {
        method: 'GET',
        path: '/sample/test/path',
      };
      const processContext = {};
      const field = 'field';
      const value = 'value';
      const context = composeHttpContext(request, response, processContext);

      // acts
      context.append(field, value);

      // asserts
      expect(appendSpy.calledWithExactly(field, value)).to.be.true;
    });
  });

  describe('#get() and set()', () => {
    let request;
    let response;
    let getSpy;
    let setSpy;

    before(() => {
      request = {
        method: 'GET',
        path: '/sample/test/path',
        get: () => { }
      };
      response = {
        set: () => { }
      };
      getSpy = sinon.spy(request, 'get');
      setSpy = sinon.spy(response, 'set');
    });

    after(() => {
      getSpy.restore();
      setSpy.restore();
    });

    it('expect to get a value', () => {
      // arranges
      const processContext = {};
      const field = 'field';
      const context = composeHttpContext(request, response, processContext);

      // acts
      context.get(field);

      // asserts
      expect(getSpy.calledWithExactly(field)).to.be.true;
    });

    it('expect to set a field and a value', () => {
      // arranges
      const processContext = {};
      const field = 'field';
      const value = 'value';
      const context = composeHttpContext(request, response, processContext);

      // acts
      context.set(field, value);

      // asserts
      expect(setSpy.calledWithExactly(field, value)).to.be.true;
    });

    it('expect to set a value', () => {
      // arranges
      const processContext = {};
      const value = { field: 'value' };
      const context = composeHttpContext(request, response, processContext);

      // acts
      context.set(value);

      // asserts
      expect(setSpy.calledWithExactly(value)).to.be.true;
    });
  });
});
