'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const getProcessContext = require('../../../dst/lib/util/process.context.functions').getProcessContext;
const setProcessContext = require('../../../dst/lib/util/process.context.functions').setProcessContext;

describe('process.context.functions.js tests', () => {
  describe('#setProcessContext() and getProcessContext()', () => {
    it('expect to set and get a process context', () => {
      // arranges
      const application = {};
      const processContext = {};

      // acts
      setProcessContext(application, processContext);
      const result = getProcessContext(application);

      // asserts
      expect(result).to.equal(processContext);
    });
  });
});
