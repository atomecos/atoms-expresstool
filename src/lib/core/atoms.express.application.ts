import { Express } from "express";
import { Application } from "atoms-httpcore";
import { IProcessContext } from "atomservicescore";

export interface AtomsExpressApplication extends
  Express,
  Application.IApplicationComposable,
  Application.IProcessContextFunctions {
}
