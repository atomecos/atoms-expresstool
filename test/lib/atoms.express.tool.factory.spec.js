'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const express = require('express');
const Util = require('../../dst/lib/util').Util;
const AtomsExpressToolFactory = require('../../dst/lib/atoms.express.tool.factory').AtomsExpressToolFactory;

describe('atoms.express.tool.factory.js tests', () => {
  describe('#AtomsExpressToolFactory()', () => {
    it('expect to create an instance of express', () => {
      // arranges

      // acts
      const instance = AtomsExpressToolFactory();

      // asserts
      expect(instance).not.to.be.undefined;
    });
  });

  describe('#setProcessContext()', () => {
    it('expect to set a process context', () => {
      // arranges
      const instance = AtomsExpressToolFactory();
      const context = {};

      // acts
      instance.setProcessContext(context);

      // asserts
      expect(instance.getProcessContext()).to.equal(context);
    });
  });

  describe('#compose()', () => {
    it('expect to compose a function', () => {
      // arranges
      const instance = AtomsExpressToolFactory();
      const composing = () => { };

      // acts
      const composed = instance.compose(composing);

      // asserts
      expect(typeof composed).to.equal("function");
    });

    it('expect to call a composed function with exactly specified arguments', () => {
      // arranges
      const instance = AtomsExpressToolFactory();
      const processContext = {};
      instance.setProcessContext(processContext);
      const composing = sinon.stub();
      const arg_a = { val: "arg_a" };
      const arg_b = { val: "arg_b" };
      const req = { method: "GET", path: "/" };
      const res = {};
      const next = function () { };
      const composed = instance.compose(composing, arg_a, arg_b);
      const ctx = Util.composeHttpContext(req, res, processContext);

      // acts
      composed(req, res, next);

      // asserts
      expect(composing.calledWithExactly(ctx, arg_a, arg_b)).to.be.false;
      expect(composing.calledWithExactly(ctx, arg_a, arg_b, next)).to.be.true;
    });

    it('expect to call a composed function with exactly specified arguments, in case of no process context', () => {
      // arranges
      const instance = AtomsExpressToolFactory();
      const composing = sinon.stub();
      const arg_a = { val: "arg_a" };
      const arg_b = { val: "arg_b" };
      const req = { method: "GET", path: "/" };
      const res = {};
      const next = function () { };
      const composed = instance.compose(composing, arg_a, arg_b);
      const ctx = Util.composeHttpContext(req, res);

      // acts
      composed(req, res, next);

      // asserts
      expect(composing.calledWithExactly(ctx, arg_a, arg_b)).to.be.false;
      expect(composing.calledWithExactly(ctx, arg_a, arg_b, next)).to.be.true;
    });
  });
});
