import { Request, Response } from "express";
import { HttpContext, HttpContextStore } from "atoms-httpcore";
import { IProcessContext } from "atomservicescore";

export const composeHttpContext = (request: Request, response: Response, processContext?: IProcessContext): HttpContext => {
  return {
    process: processContext,
    store: new HttpContextStore(),
    method: request.method,
    path: request.path,
    request,
    response
  };
};
