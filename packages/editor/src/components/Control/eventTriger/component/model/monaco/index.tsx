/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "./index.scss";

export const Editor: React.FC = () => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;

        const example = monaco.editor.create(monacoEl.current!, {
          value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
            "\n"
          ),
          language: "typescript",
        });

        example.onDidChangeModelContent(() => {
          handleValue(example.getValue());
        });

        return example;
      });
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

  const handleValue = (value: string) => {
    console.log(value, "ValueValue");
  };

  return <div className={"monacoEditor"} ref={monacoEl}></div>;
};
