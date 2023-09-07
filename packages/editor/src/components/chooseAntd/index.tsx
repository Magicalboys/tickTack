/**
 * 选择性地导出Antd组件
 */
import * as Antd from "antd"; // 导入整个 Antd 库
import { LibraryComponentInstanceProps } from "../../../../types/src/library-component";
// import { useState } from "react";
import { useEffect } from "react";

const App: React.FC<{
  props: LibraryComponentInstanceProps;
  componentName?: string;
  type?: string;
}> = ({ props, componentName, type }) => {
  useEffect(() => {
    console.log(props, "wwwwwwwwwwwwwwwwwww");
  }, [props]);

  //   const handleChange = () => {};
  console.log(props, "props");
  let ShowContent;
  if (type !== undefined) {
    if (type === "string") {
      ShowContent = Antd["Input"];
      ShowContent.defaultProps?.onChange;
    } else if (type === "select") {
      ShowContent = Antd["Select"];
    }
  } else {
    ShowContent = Antd[`${componentName}`];
  }
  return (
    <>
      <ShowContent {...props}></ShowContent>
    </>
  );
};

export default App;
