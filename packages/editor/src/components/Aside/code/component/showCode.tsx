import { useState, useCallback, useRef, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import * as monaco from "monaco-editor";
import { configureMonaco } from "../../../../monaco/monacoSetup";

const ShowCode = ({ codeJson }: { codeJson: string }) => {
  // console.log(codeJson, "codeJSon");
  const [value, setValue] = useState(codeJson);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>(); // 编辑器实例
  const monacoRef = useRef<typeof monaco>(); // monaco 实例

  useEffect(() => {
    configureMonaco(monaco);
  }, []);

  // 获取编辑器实例
  const editorDidMountHandle = useCallback(
    (editor: monaco.editor.IStandaloneCodeEditor, monacoIns: typeof monaco) => {
      editorRef.current = editor;
      monacoRef.current = monacoIns;
    },
    []
  );

  return (
    <MonacoEditor
      language='javascript'
      height={600}
      // width={500}
      theme='vs-dark' // 主题选择
      value={value} // 编辑器初始显示文字
      // onChange={setValue}
      options={{
        readOnly: false, // 是否只读
        roundedSelection: false, //属性允许将选区的左右两端进行圆角处理
        cursorStyle: "line", // 属性允许更改光标的样式
        wordWrap: "on",
      }}
      editorDidMount={editorDidMountHandle}
    />
  );
};

export default ShowCode;
