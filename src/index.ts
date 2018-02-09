import * as express from "express";
import { ToolsetsDefined } from "atomservicescore";
import { AtomsExpressToolFactory } from "./lib";
import { AtomsExpressApplication } from "./lib/core";

export { express, AtomsExpressApplication };

module.exports = {
  toolsets: "AtomsExpressTool",
  asset: AtomsExpressToolFactory,
  as: "factory",
} as ToolsetsDefined;
