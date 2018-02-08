import { Request, Response } from "express";
import { HttpContext, HttpContextStore } from "atoms-httpcore";
import { IProcessContext } from "atomservicescore";
import { composeHttpContext } from "./compose.http.context";
import { getProcessContext, setProcessContext } from "./process.context.functions";

export const Util = {
  composeHttpContext,
  getProcessContext,
  setProcessContext,
};
