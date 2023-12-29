import * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import { CssWorker, HtmlWorker, JsonWorker, TSWorker } from "./use-languages";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === "json") {
      return new JsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new CssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new HtmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new TSWorker();
    }
    return new EditorWorker();
  },
};
export default Monaco;
