import * as URL from "url";
import { Request, Response } from "express";
import { HttpContext, HttpContextStore, Util } from "atoms-httpcore";
import { IProcessContext } from "atomservicescore";

export const composeHttpContext = (request: Request, response: Response, processContext?: IProcessContext): HttpContext<Request, Response> => new HttpContextWrapper(request, response, processContext);

class HttpContextWrapper implements HttpContext<Request, Response> {
  toolname: string;
  process: IProcessContext;
  store: HttpContextStore;
  request: Request;
  response: Response;

  get header() {
    return this.headers;
  }

  set header(val: any) {
    this.headers = val;
  }

  get headers() {
    return this.request.headers;
  }

  set headers(val: any) {
    this.request.headers = val;
  }

  get method() {
    return this.request.method;
  }

  set method(val: string) {
    this.request.method = val;
  }

  get href() {
    return `${this.origin}${this.url}`;
  }

  get origin() {
    return `${this.protocol}://${this.host}`;
  }

  get host() {
    const host = this.get("X-Forwarded-Host") || this.get("Host") || this.hostname;
    return host.split(/\s*,\s*/)[0];
  }

  get hostname() {
    return this.request.hostname;
  }

  get protocol() {
    return this.request.protocol;
  }

  get originalUrl() {
    return this.request.originalUrl;
  }

  get url() {
    return this.request.url;
  }

  set url(val: any) {
    this.request.url = val;
  }

  get path() {
    return this.request.path;
  }

  get querystring() {
    return URL.parse(this.url).query;
  }

  get query() {
    return this.request.query;
  }

  set body(val: any) {
    this.response.send(val);
  }

  set status(val: any) {
    this.response.sendStatus(val);
  }

  set message(val: any) {
    this.response.send(val);
  }

  set length(val: string) {
    this.set("Content-Length", val);
  }

  set type(val: string) {
    this.response.type(val);
  }

  constructor(request: Request, response: Response, processContext: IProcessContext) {
    this.toolname = "AtomsExpressTool";
    this.process = processContext;
    this.request = request;
    this.response = response;
    this.store = new HttpContextStore();
  }

  get(field: string) {
    return this.request.get(field);
  }

  set(field: string | any, value?: string) {
    if (typeof field === "string") {
      this.response.set(field, value);
    } else {
      this.response.set(field);
    }
  }

  append(field: string, value: string) {
    this.response.append(field, value);
  }

  data() {
    const body = Util.cloneDeep(this.request.body || {});
    const query = Util.cloneDeep(this.query || {});

    return Object.assign({}, body, query);
  }
}