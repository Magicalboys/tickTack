// import { useMessage } from "./useMessage";
import { windowConsole } from "./windowConsole";

export type ApiName = keyof typeof apis;
export type Apis = typeof apis;

export type APIEventInfo<T extends ApiName> = {
  action: T;
  option: Record<string, unknown>;
}

export const apis = [
  // useMessage,
  windowConsole,
];
