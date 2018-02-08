import { IProcessContext } from "atomservicescore";

export const getProcessContext = (application: any): IProcessContext => application._processContext;
export const setProcessContext = (application: any, processContext: IProcessContext) => application._processContext = processContext;
