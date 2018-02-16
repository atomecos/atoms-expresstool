import * as express from "express";
import { Express, Request, Response, NextFunction } from "express";
import * as BodyParser from "body-parser";
import { IProcessContext } from "atomservicescore";
import { AtomsExpressApplication } from "./core/atoms.express.application";
import { Util } from "./util";

export const AtomsExpressToolFactory = (toolsetsName: string, properties: any) => {
  const application: AtomsExpressApplication = express();

  application.getProcessContext = () => Util.getProcessContext(application);
  application.setProcessContext = (processContext: IProcessContext) => Util.setProcessContext(application, processContext);

  application.compose = (composing: Function, ...args: any[]) => (request: Request, response: Response, next: NextFunction) => {
    const ctx = Util.composeHttpContext(request, response, application.getProcessContext());
    const composedArgs = [ctx, ...args, next];
    composing.apply(undefined, composedArgs);
  };

  application.useCompose = (composing: Function, ...args: any[]) => {
    const composed: any = application.compose(composing, ...args);
    application.use(composed);
  };

  // Initialize Application
  application.use(BodyParser.urlencoded({ extended: false }));
  application.use(BodyParser.json());

  return application;
};
