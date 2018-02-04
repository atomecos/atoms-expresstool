'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const express = require('express');
const AtomsExpressToolFactory = require('../../dst/lib/atoms.express.tool.factory').AtomsExpressToolFactory;

describe('atoms.express.tool.factory.js tests', () => {
  describe('#AtomsExpressToolFactory()', () => {
    it('expect to create an instance of express', () => {
      // arranges

      // acts
      const result = AtomsExpressToolFactory();

      // asserts
      expect(result).not.to.be.undefined;
    });
  });
});
