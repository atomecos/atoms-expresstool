import { Application } from "atoms-httpcore";
import { Express } from "express";

export interface AtomsExpressApplication extends Express, Application.IApplicationComposable { }
