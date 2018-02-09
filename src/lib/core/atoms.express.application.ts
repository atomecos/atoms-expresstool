import { Express } from "express";
import { Application } from "atoms-httpcore";

export interface AtomsExpressApplication extends
  Express,
  Application.IApplicationComposable,
  Application.IProcessContextFunctions {
}
