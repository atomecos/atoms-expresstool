'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const composeHttpContext = require('../../../dst/lib/util/compose.http.context').composeHttpContext;

describe('compose.http.context.js tests', () => {
  describe('#AtomsExpressToolFactory()', () => {
    it('expect to create an instance of express', () => {
      // arranges
      const request = {
        method: "GET",
        path: "/sample/test/path"
      };
      const response = {};
      const processContext = {};
      const expected01 = {
        process: undefined,
        store: {},
        method: request.method,
        path: request.path,
        request,
        response
      };
      const expected02 = {
        process: processContext,
        store: {},
        method: request.method,
        path: request.path,
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
});
