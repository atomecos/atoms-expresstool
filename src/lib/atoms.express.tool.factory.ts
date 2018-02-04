import * as express from "express";
import { IProcessContext } from "atomservicescore";
import { Composing } from "atoms-httpcore";
import { Express, Request, Response, NextFunction } from "express";
import { AtomsExpressApplication } from "./atoms.express.application";

export const AtomsExpressToolFactory = (toolsetsName: string, properties: any) => {
  const application: AtomsExpressApplication = express();

  application.compose = (context: IProcessContext, composing: Composing) =>
    application.use((request: Request, response: Response, next: NextFunction) =>
      composing(
        {
          process: context,
          method: request.method,
          path: request.path,
          request,
          response,
        },
        next
      ));

  return application;
};
