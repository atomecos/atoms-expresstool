import { ToolsetsDefined } from "atomservicescore";
import * as express from "express";
import { AtomsExpressApplication, AtomsExpressToolFactory } from "./lib";

export { express, AtomsExpressApplication };

module.exports = {
  toolsets: "AtomsExpressTool",
  asset: AtomsExpressToolFactory,
  as: "factory",
} as ToolsetsDefined;
